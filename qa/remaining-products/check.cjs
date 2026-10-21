const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
const origin = 'http://127.0.0.1:4173/';
const phase = process.argv[2] || 'final';
const slug = process.argv[3] || 'monsieur-rouge';
const productName = slug === 'monsieur-rouge' ? 'MONSIEUR ROUGE' : 'BLACK EDEN';
(async () => {
 const browser = await chromium.launch({headless:true, executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const [width,height] of [[1882,994],[1440,900],[1920,1080],[1024,768],[768,1024],[390,844],[320,568],[667,375]]) {
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:width<1000?2:1,isMobile:width<1000,hasTouch:width<1000,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.goto(origin+slug+'.html',{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(imgs=>{imgs.forEach(i=>i.loading='eager');return Promise.all(imgs.map(i=>i.decode().catch(()=>{})))});
  await page.screenshot({path:`${__dirname}/${phase}-${slug}-${width}.png`,fullPage:true,scale:'css'});
  const state=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom}};
   return {pageWidth:document.documentElement.scrollWidth,missing:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),sections:[...document.querySelectorAll('main>section')].map(e=>({name:e.className,...box(e)})),heroCTA:box(document.querySelector('.blade-hero .button')),clipped:[...document.querySelectorAll('h1:not(:has(img)),h2,p,.button')].filter(e=>e.clientWidth&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim()),copyOverflows:[...document.querySelectorAll('.blade-copy')].filter(e=>{const r=e.getBoundingClientRect(),s=e.closest('section').getBoundingClientRect();return r.bottom>s.bottom+1||r.right>s.right+1}).map(e=>e.closest('section').className)};
  });
  await page.locator('.blade-hero .button').click();assert(page.url().endsWith('#histoire'));
  await page.locator('.blade-history .button').click();assert(page.url().endsWith('#sillage'));
  await page.locator('.blade-craft .button').click();await page.waitForURL('**/la-maison.html#savoir-faire');
  await page.goto(origin+slug+'.html',{waitUntil:'networkidle'});
  if(width<1200){await page.locator('.menu-button').click();assert(await page.locator('#navigation').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');}
  await page.locator('.search-button').click();await page.locator('#perfume-search').fill(productName);assert.equal(await page.locator('.search-results a').getAttribute('href'),slug+'.html');await page.locator('.search-results a').click();await page.waitForURL('**/'+slug+'.html');
  await page.locator('[data-info="faq"]').click();assert(await page.locator('#detail-dialog').isVisible());await page.keyboard.press('Escape');
  await page.locator('#email').fill('qa@example.com');await page.locator('#newsletter-form button').click();assert((await page.locator('#newsletter-status').innerText()).includes('n’a pas été transmise'));
  assert.equal(await page.locator('.blade-signature .button').getAttribute('href'),'https://almanzor.ma');
  results.push({width,height,errors,...state});console.log(JSON.stringify({width,height,errors,clipped:state.clipped,overflow:state.copyOverflows,heroBottom:Math.round(state.heroCTA.bottom),pageWidth:state.pageWidth}));await page.close();
 }
 // Real navigation into the new page, including the image and footer links.
 for(const [route,selector] of [['index.html','#'+slug+' .product-image'],['index.html','#'+slug+' .button'],['nos-parfums.html','#'+slug+' .story-button'],['la-maison.html','.footer-column a[href="'+slug+'.html"]']]){
  const page=await browser.newPage({reducedMotion:'reduce'});await page.goto(origin+route);await page.locator(selector).click();await page.waitForURL('**/'+slug+'.html');assert.equal((await page.locator('h1').textContent()).trim(),productName);await page.close();
 }
 const motion=[];
 for(const width of [390,1440]){
  const p=await browser.newPage({viewport:{width,height:844},reducedMotion:'no-preference'});await p.goto(origin+slug+'.html');
  const total=await p.locator('.scroll-reveal').count();assert(total>25);
  await p.evaluate(()=>{window.motionSections=new Set();document.addEventListener('transitionstart',e=>{if(e.propertyName==='opacity')window.motionSections.add(e.target.closest('section,footer')?.className)})});
  const height=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let top=0;top<height;top+=500){await p.evaluate(top=>scrollTo({top,behavior:'instant'}),top);await p.waitForTimeout(75);}
  await p.waitForTimeout(1600);assert.equal(await p.locator('.is-reveal-pending').count(),0);
  const animated=await p.evaluate(()=>[...window.motionSections]);assert(animated.some(s=>s?.includes('blade-history')));assert(animated.some(s=>s?.includes('blade-craft')));
  motion.push({width,total,animated});await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.is-reveal-pending').count(),0);await p.close();
 }
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(origin+slug+'.html');assert.equal(await nojs.locator('.is-reveal-pending').count(),0);assert(await nojs.locator('h1').isVisible());await nojs.close();
 const passed=results.every(r=>!r.errors.length&&!r.missing.length&&!r.clipped.length&&!r.copyOverflows.length&&r.pageWidth===r.width&&r.heroCTA.bottom<=r.height+1);
 await fs.writeFile(`${__dirname}/${phase}-${slug}-checks.json`,JSON.stringify({product:slug,result:passed?'passed':'needs-fix',results,motion},null,2));await browser.close();
 if(phase==='final')assert(passed,'Responsive measurements must all pass');
})().catch(e=>{console.error(e);process.exit(1)});
