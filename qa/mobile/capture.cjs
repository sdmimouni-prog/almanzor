const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises');
const phase=process.argv[2]||'before';
const sizes=[[320,568],[375,812],[390,844],[430,932],[768,1024],[844,390]];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];await fs.mkdir(__dirname+'/'+phase,{recursive:true});
 for(const route of ['index','nos-parfums','la-maison'])for(const [width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.goto(`http://127.0.0.1:4173/${route}.html`,{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(imgs=>{imgs.forEach(i=>i.loading='eager');return Promise.all(imgs.map(i=>i.decode().catch(()=>{})))});
  const state=await page.evaluate(()=>{
   const box=e=>{const b=e.getBoundingClientRect();return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}};
   const visible=e=>{const s=getComputedStyle(e),b=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&b.width>0&&b.height>0;};
   return {pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,hero:box(document.querySelector('main > section')),title:box(document.querySelector('h1')),
    missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
    targets:[...document.querySelectorAll('a,button,input')].filter(visible).map(e=>({name:e.getAttribute('aria-label')||e.textContent.trim(),selector:e.id||e.className,box:box(e),font:getComputedStyle(e).fontSize})),
    clipped:[...document.querySelectorAll('h1,h2,h3,p,button,input')].filter(visible).filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>({name:e.textContent.trim(),selector:e.className,scroll:e.scrollWidth,client:e.clientWidth})),
   };
  });
  if(width===320||width===375||width===430||width===844)await page.screenshot({path:`${__dirname}/${phase}/${route}-${width}-page.png`,fullPage:true});
  await page.locator('.menu-button').tap();
  state.menu=await page.locator('#navigation').evaluate(e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom,viewport:innerHeight,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,overflow:getComputedStyle(e).overflowY}});
  if(width===375||width===844)await page.screenshot({path:`${__dirname}/${phase}/${route}-${width}-menu.png`});
  await page.locator('.menu-button').tap();
  await page.locator('.search-button').tap();await page.locator('#perfume-search').fill('ya');
  if(width===375)await page.screenshot({path:`${__dirname}/${phase}/${route}-${width}-search.png`});
  state.search={count:await page.locator('.search-results a').count(),font:await page.locator('#perfume-search').evaluate(e=>getComputedStyle(e).fontSize)};
  await page.locator('.dialog-close').tap();
  await page.locator('[data-product="monsieur-rouge"], [data-story="matieres"]').first().tap();
  if(width===375||width===844)await page.screenshot({path:`${__dirname}/${phase}/${route}-${width}-dialog.png`});
  state.dialog=await page.locator('#detail-dialog').evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,overflow:getComputedStyle(e).overflowY}));
  await page.locator('.dialog-close').tap();
  await page.locator('#email').fill('qa@example.com');await page.locator('#newsletter-form button').tap();
  state.newsletter=await page.locator('#newsletter-status').innerText();
  if(width===375||width===320)await page.locator('.shared-newsletter').screenshot({path:`${__dirname}/${phase}/${route}-${width}-newsletter.png`});
  results.push({route,width,height,errors,...state});console.log(`${route} ${width}: page ${state.pageWidth}; clipped ${state.clipped.length}; menu bottom ${Math.round(state.menu.bottom)}/${height}`);
  await page.close();
 }
 await fs.writeFile(__dirname+'/'+phase+'/inventory.json',JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
