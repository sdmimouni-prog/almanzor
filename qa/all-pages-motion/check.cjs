const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
const routes=['index.html','nos-parfums.html','la-maison.html'];
const sizes=[[1440,900],[768,1024],[390,844],[319,568]];
const motion='.scroll-reveal,.story-reveal,.collection-reveal';
const keySections={'index.html':['#maison','#parfums'],'nos-parfums.html':['#blade','#yaya'],'la-maison.html':['#histoire','#savoir-faire']};
async function readState(page){return page.evaluate(()=>({
 pending:[...document.querySelectorAll('.is-reveal-pending')].map(e=>e.className),
 hidden:[...document.querySelectorAll('.scroll-reveal,.story-reveal,.collection-reveal')].filter(e=>parseFloat(getComputedStyle(e).opacity)<.7).map(e=>e.className),
 missing:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src),
 sections:[...document.querySelectorAll('main > section, footer')].map(e=>({id:e.id||e.classList[0],height:e.offsetHeight,items:e.querySelectorAll('.scroll-reveal,.story-reveal,.collection-reveal').length})),
 width:document.documentElement.scrollWidth,events:window.motionEvents
}));}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const route of routes)for(const [width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.addInitScript(()=>{
   window.motionEvents=[];
   document.addEventListener('transitionrun',e=>{const s=e.target.closest('main > section, footer');if(s)window.motionEvents.push({section:s.id||s.classList[0],property:e.propertyName,target:e.target.className});});
  });
  await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1600);
  assert(await page.locator('.is-reveal-pending').count()>0,`${route}: offscreen blocks should wait`);
  const initialDimensions=await page.locator('main > section,footer').evaluateAll(es=>es.map(e=>e.offsetHeight));
  const total=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let top=0;top<total;top+=Math.round(height*.55)){
   await page.evaluate(top=>scrollTo({top,behavior:'instant'}),top);await page.waitForTimeout(150);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,`${route} ${width}: overflow during motion`);
  }
  await page.waitForTimeout(1700);
  const state=await readState(page);
  assert.deepEqual(state.pending,[],`${route} ${width}: unrevealed items`);
  assert.deepEqual(state.hidden,[]);assert.deepEqual(state.missing,[]);assert.deepEqual(errors,[]);
  const animated=[...new Set(state.events.map(e=>e.section))];
  for(const section of state.sections){assert(section.items>0,`${route}: no animated children in ${section.id}`);assert(animated.includes(section.id),`${route} ${width}: no transition in ${section.id}`);}
  if(width===1440||width===390){
   await page.screenshot({path:`${__dirname}/${route}-${width}-rest.png`,fullPage:true});
   for(const selector of keySections[route])await page.locator(selector).screenshot({path:`${__dirname}/${route}-${width}-${selector.slice(1)}.png`});
  }
  const count=await page.evaluate(()=>window.motionEvents.length);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(900);
  assert.equal(await page.evaluate(()=>window.motionEvents.length),count,'No replay on returning to a seen block');
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
  assert.deepEqual(await page.locator('main > section,footer').evaluateAll(es=>es.map(e=>e.offsetHeight)),initialDimensions,'Unchanged section dimensions');
  assert.equal(await page.locator('.is-reveal-pending').count(),0);
  assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
  if(width===1440||width===390){
   for(let top=0;top<total;top+=height)await page.evaluate(top=>scrollTo({top,behavior:'instant'}),top);
   await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
   await page.screenshot({path:`${__dirname}/${route}-${width}-reduced.png`,fullPage:true});
  }
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});
  await page.locator('#email').focus();
  assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).clipPath),'none');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('.is-reveal-pending'));
  assert.equal(await page.locator('.is-reveal-pending').count(),0,'Reduced motion applied during visit');
  const result={route,width,height,animated,items:state.sections.reduce((n,s)=>n+s.items,0),transitions:state.events.length,errors};
  results.push(result);console.log(JSON.stringify(result));await page.close();
 }
 for(const route of routes){
  const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.is-reveal-pending').count(),0);assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).opacity),'1');await page.close();
  const direct=await browser.newPage({viewport:{width:1440,height:900}});
  const selector=keySections[route][1];
  await direct.goto('http://127.0.0.1:4173/'+route+selector,{waitUntil:'networkidle'});await direct.waitForTimeout(1800);
  assert.equal(await direct.locator(selector+' .is-reveal-pending').count(),0,`Direct anchor ${route}${selector}`);
  const button=direct.locator(selector+' button[data-product],'+selector+' button[data-story]').first();
  if(await button.count()){await button.click();assert(await direct.locator('#detail-dialog').isVisible());await direct.keyboard.press('Escape');}
  await direct.close();
 }
 const noObserver=await browser.newPage({viewport:{width:390,height:844}});
 await noObserver.addInitScript(()=>{delete window.IntersectionObserver});await noObserver.goto('http://127.0.0.1:4173/la-maison.html',{waitUntil:'networkidle'});
 assert.equal(await noObserver.locator('.is-reveal-pending').count(),0);await noObserver.close();
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify({result:'passed',results,fallbacks:'JavaScript disabled and IntersectionObserver unavailable: visible',directAnchors:'passed',keyboard:'passed',reducedMotion:'passed'},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
