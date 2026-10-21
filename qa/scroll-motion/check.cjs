const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs = require('node:fs/promises'), assert = require('node:assert/strict');
const selectors = ['.reference-hero','#maison','#univers','#parfums','#sillage','#signature','#points-de-vente','#inspiration','.newsletter','.footer'];
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for (const [width,height] of [[1440,900],[768,1024],[390,844],[319,568]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.addInitScript(() => {
   window.motionEvents=[];
   document.addEventListener('transitionrun', e => {
    const section=e.target.closest('main > section, footer');
    if(section)window.motionEvents.push({section:section.id||section.classList[0],property:e.propertyName});
   });
  });
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(180);
  if(width===1440)await page.screenshot({path:__dirname+'/hero-entering.png'});
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('.reference-hero').evaluate(e=>e.offsetHeight),height);
  const dimensions=await page.locator('main > section, footer').evaluateAll(es=>es.map(e=>({id:e.id||e.classList[0],height:e.getBoundingClientRect().height})));
  const total=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let top=0;top<total;top+=Math.round(height*.55)){
   await page.evaluate(top=>scrollTo({top,behavior:'instant'}),top);
   await page.waitForTimeout(220);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,'No overflow during motion');
  }
  await page.waitForTimeout(1700);
  const state=await page.evaluate(()=>({pending:[...document.querySelectorAll('.is-reveal-pending')].map(e=>e.className),hidden:[...document.querySelectorAll('.scroll-reveal,.story-reveal,.collection-reveal')].filter(e=>getComputedStyle(e).opacity!=='1').map(e=>e.className),events:window.motionEvents,missing:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src)}));
  assert.deepEqual(state.pending,[]);assert.deepEqual(state.hidden,[]);assert.deepEqual(state.missing,[]);
  const animated=[...new Set(state.events.map(e=>e.section))];
  for(const {id} of dimensions)assert(animated.includes(id),`${width}: no entrance recorded for ${id}`);
  const eventCount=state.events.length;
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(1600);
  assert.equal(await page.evaluate(()=>window.motionEvents.length),eventCount,'Entrances do not replay');
  if(width===1440){for(const selector of ['#maison','#univers','#sillage','.newsletter'])await page.locator(selector).screenshot({path:__dirname+'/'+selector.replace(/[.#]/g,'')+'-desktop.png'});}
  if(width===390){await page.locator('#maison').screenshot({path:__dirname+'/maison-mobile.png'});await page.locator('#sillage').screenshot({path:__dirname+'/craft-mobile.png'});}
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  const reducedDimensions=await page.locator('main > section, footer').evaluateAll(es=>es.map(e=>({id:e.id||e.classList[0],height:e.getBoundingClientRect().height})));
  assert.deepEqual(dimensions,reducedDimensions,'Motion must not change section dimensions');
  assert.equal(await page.locator('.is-reveal-pending').count(),0);
  assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.locator('#email').focus();
  assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).clipPath),'none');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('.is-reveal-pending'));
  assert.equal(await page.locator('.is-reveal-pending').count(),0);
  assert.deepEqual(errors,[]);
  results.push({width,height,animated,transitions:state.events.length,dimensions,errors});await page.close();
 }
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await plain.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 assert.equal(await plain.locator('.is-reveal-pending').count(),0);
 assert.equal(await plain.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).opacity),'1');
 await plain.close();
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify({result:'passed',results,noJavaScript:'visible'},null,2));
 await browser.close();console.log(JSON.stringify(results.map(({width,height,animated,transitions,errors})=>({width,height,animated,transitions,errors})),null,2));
})().catch(e=>{console.error(e);process.exit(1)});
