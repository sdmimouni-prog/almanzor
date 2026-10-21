const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const width of [390,768,1440,1920]) {
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  console.log('Checking viewport',width);page.setDefaultTimeout(5000);
  const errors=[];const failed=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(60)}
  await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.scrollTo(0,0)});
  await page.locator('body').click({position:{x:width-5,y:700}});
  const measurements=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),sections:document.querySelectorAll('main>section').length,products:[...document.querySelectorAll('.product h3')].map(e=>e.textContent)}));
  assert.equal(measurements.scrollWidth,width,`overflow ${width}`);assert.equal(measurements.missingImages.length,0);assert.equal(measurements.sections,9);
  assert.deepEqual(measurements.products,['BLADE','YAYA','MONSIEUR ROUGE','BLACK EDEN']);
  await page.screenshot({path:path.join(__dirname,`${width===390?'mobile':'desktop'}-${width}.png`),fullPage:true});
  if(width===390){
   const menu=page.locator('.menu-button');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
   await page.screenshot({path:path.join(__dirname,'mobile-menu.png')});
   await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
   await menu.click();await page.locator('#navigation').getByRole('link',{name:'Nos parfums',exact:true}).click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
  }
  for(const key of ['blade','yaya','monsieur-rouge','black-eden']){
   await page.locator(`#${key} .product-image`).click();assert.equal(await page.locator('dialog').isVisible(),true);
   assert.equal(await page.locator('#dialog-title').innerText(),measurements.products[['blade','yaya','monsieur-rouge','black-eden'].indexOf(key)]);
   if(width===390&&key==='blade')await page.screenshot({path:path.join(__dirname,'mobile-product.png')});
   await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
   await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  }
  await page.locator('[data-story="maison"]').click();assert.equal(await page.locator('#dialog-title').innerText(),'L’art du parfum');await page.getByRole('button',{name:'Fermer la fenêtre'}).click();
  await page.locator('#email').fill('incorrect');await page.locator('#newsletter-form button').click();assert.equal(await page.locator('#email').evaluate(i=>i.validity.typeMismatch),true);
  assert.equal(await page.locator('#newsletter-status').innerText(),'');
  await page.locator('#email').fill('verification@example.com');let requests=0;page.on('request',r=>{if(r.method()==='POST')requests++});
  await page.locator('#newsletter-form button').click();assert.match(await page.locator('#newsletter-status').innerText(),/n’a pas été transmise ni enregistrée/);assert.equal(requests,0);
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  results.push({viewport:width,...measurements,errors,failed,interactions:'passed',newsletterPostRequests:requests});
  await page.close();
 }
 await fs.writeFile(path.join(__dirname,'checks.json'),JSON.stringify(results,null,2));
 await browser.close();console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
