const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
const origin='http://127.0.0.1:4173/';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const route of ['index','nos-parfums','la-maison'])for(const [width,height] of [[320,568],[390,844],[667,375],[844,390]]){
  const p=await browser.newPage({viewport:{width,height},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[],external=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(origin))external.push(r.url())});
  await p.goto(origin+route+'.html',{waitUntil:'networkidle'});
  const button=p.locator('.menu-button'),nav=p.locator('#navigation');
  await button.tap();assert.equal(await button.getAttribute('aria-expanded'),'true');
  assert(await nav.isVisible());
  assert(await nav.evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1),'Menu stays inside viewport');
  const order=nav.getByRole('link',{name:'Commander',exact:true});
  await order.scrollIntoViewIfNeeded();
  assert(await order.evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=98&&r.bottom<=innerHeight}),'Last menu item reachable');
  await p.keyboard.press('Escape');assert.equal(await button.getAttribute('aria-expanded'),'false');
  assert.equal(await button.evaluate(e=>document.activeElement===e),true,'Escape restores menu focus');
  await button.tap();await nav.getByRole('link',{name:'La Maison',exact:true}).tap();
  await p.waitForURL('**/la-maison.html');assert.equal(await button.getAttribute('aria-expanded'),'false');
  await button.tap();await nav.getByRole('link',{name:'Nos parfums',exact:true}).tap();await p.waitForURL('**/nos-parfums.html');
  await p.locator('.search-button').tap();await p.locator('#perfume-search').fill('introuvable');assert.equal(await p.locator('.search-results a').count(),0);assert(await p.locator('.search-empty').isVisible());
  await p.locator('#perfume-search').fill('monsieur rouge');assert.equal(await p.locator('.search-results a').count(),1);
  await p.locator('.search-results a').tap();await p.waitForURL('**/monsieur-rouge.html');assert.equal(await p.locator('#detail-dialog').isVisible(),false);
  assert.equal(await p.locator('h1').textContent(),'MONSIEUR ROUGE');
  const product=p.locator('[data-info="faq"]');await product.tap();
  const content=p.locator('#dialog-content');await content.evaluate(e=>e.scrollTop=e.scrollHeight);
  const close=p.locator('.dialog-close');
  assert(await close.evaluate(e=>{const b=e.getBoundingClientRect();return b.top>=0&&b.bottom<=innerHeight&&document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.closest('.dialog-close')===e}),'Close reachable after scrolling a long dialog');
  await close.tap();assert.equal(await product.evaluate(e=>document.activeElement===e),true);
  await p.locator('[data-info="privacy"]').tap();assert.equal(await content.evaluate(e=>e.scrollTop),0,'A new information dialog opens at its start');
  for(const key of ['Tab','Shift+Tab','Tab']){await p.keyboard.press(key);assert(await p.evaluate(()=>document.activeElement.closest('#detail-dialog')!==null),'Modal keeps keyboard focus');}await p.keyboard.press('Escape');
  await p.locator('#newsletter-form button').tap();assert.equal(await p.locator('#email').evaluate(e=>e.validity.valid),false);
  await p.locator('#email').fill('invalide');await p.locator('#newsletter-form button').tap();assert.equal(await p.locator('#newsletter-status').innerText(),'');
  await p.locator('#email').fill('qa@example.com');await p.locator('#newsletter-form button').tap();assert((await p.locator('#newsletter-status').innerText()).includes('n’a pas été transmise'));
  assert.equal(await p.locator('#email').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16),true);
  await p.goto(origin+route+'.html',{waitUntil:'networkidle'});
  const total=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let top=0;top<total;top+=height)await p.evaluate(top=>scrollTo({top,behavior:'instant'}),top);
  await p.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));
  assert.deepEqual(await p.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src)),[]);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),width);
  assert.equal(await p.locator('.is-reveal-pending').count(),0);
  for(const target of await p.locator('.shared-footer a,.shared-footer button').all()){
   const box=await target.boundingBox();if(box)assert(box.width>=44&&box.height>=44,'Footer touch target');
  }
  if(route==='index'){
   const first=await p.locator('#collection-grid .product').first().getAttribute('id');
   await p.locator('.collection-next').tap();assert.notEqual(await p.locator('#collection-grid .product').first().getAttribute('id'),first);
   await p.locator('.collection-prev').tap();assert.equal(await p.locator('#collection-grid .product').first().getAttribute('id'),first);
   const hero=await p.locator('.reference-hero').boundingBox();assert.equal(Math.round(hero.height),height);
   await p.evaluate(()=>scrollTo(0,0));
   assert(await p.locator('.hero-content .button').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight),'Hero CTA visible in one viewport');
   assert(await p.locator('h1').evaluate(e=>e.scrollWidth<=e.clientWidth+2),'Hero title not clipped');
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[],'No external request or newsletter transmission');
  results.push({route,width,height,result:'passed'});console.log(route,width,'passed');await p.close();
 }
 await browser.close();await fs.writeFile(__dirname+'/checks.json',JSON.stringify({result:'passed',engine:'Chromium; mobile emulation with touch, DPR 2',results},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
