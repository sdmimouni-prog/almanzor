const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs = require('node:fs/promises'), assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const route of ['index.html','nos-parfums.html','la-maison.html']) {
  for(const width of [2332,1440,1000,768,390,319]) {
   const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'}), errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
   await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});
   await page.locator('.shared-newsletter').scrollIntoViewIfNeeded();
   await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
   await page.locator('.shared-footer .brand img').evaluate(img=>img.decode());
   const boxes=await page.evaluate(()=>{
    const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};
    return {newsletter:box('.shared-newsletter'),footer:box('.shared-footer'),form:box('#newsletter-form'),grid:box('.footer-grid'),copyright:box('.copyright'),width:document.documentElement.scrollWidth};
   });
   assert.equal(boxes.width,width,`${route} ${width}: overflow`);
   assert.equal(await page.locator('.shared-footer').count(),1);
   assert.equal(await page.locator('.shared-newsletter').count(),1);
   assert.equal(await page.locator('.shared-footer h2').count(),4);
   assert.equal(await page.locator('.shared-footer .footer-grid > *').count(),5);
   assert.deepEqual(errors,[]);
   if(route==='la-maison.html' || width===1440) {
    const clip={x:0,y:boxes.newsletter.y,width,height:Math.ceil(boxes.newsletter.height+boxes.footer.height)};
    await page.screenshot({path:`${__dirname}/${route.replace('.html','')}-${width}.png`,clip,fullPage:true});
   }
   if(width===1440) {
    for(const key of ['contact','faq','legal','privacy','terms','facebook','youtube']) {
     await page.locator(`.shared-footer [data-info="${key}"]`).click();
     assert(await page.locator('#detail-dialog').isVisible());
     assert((await page.locator('#dialog-title').innerText()).length>0);
     await page.keyboard.press('Escape');
     assert(!(await page.locator('#detail-dialog').isVisible()));
    }
    assert.equal(await page.locator('#email').evaluate(e=>e.checkValidity()),false);
    await page.locator('#email').fill('footer-qa@example.com');
    const requests=[];page.on('request',r=>requests.push(r.url()));
    await page.locator('#newsletter-form button').click();
    assert.match(await page.locator('#newsletter-status').innerText(),/n’a pas été transmise ni enregistrée/);
    assert.deepEqual(requests,[],'Newsletter must not transmit an email');
    const links=await page.locator('.shared-footer a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
    for(const href of links.filter(h=>!h.startsWith('https:'))) {
     const [file,hash]=href.split('#'), html=await fs.readFile(__dirname+'/../../'+file,'utf8');
     if(hash)assert(html.includes(`id="${hash}"`),`Missing destination: ${href}`);
    }
   }
   results.push({route,width,...boxes,errors});await page.close();
  }
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 await page.locator('.shared-newsletter').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1500);
 await page.locator('.shared-footer').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1500);
 assert.equal(await page.locator('.shared-footer .is-reveal-pending,.shared-newsletter .is-reveal-pending').count(),0,'Shared footer scroll entrance');
 await page.locator('#email').focus();
 assert.equal(await page.locator('#newsletter-form').evaluate(e=>getComputedStyle(e).opacity),'1');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),1440);
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify({result:'passed',results,dialogs:'passed',links:'passed',newsletter:'local only; no request',motion:'passed'},null,2));
 await browser.close();console.log(JSON.stringify(results.map(r=>({route:r.route,width:r.width,newsletterHeight:r.newsletter.height,footerHeight:r.footer.height,errors:r.errors})),null,2));
})().catch(e=>{console.error(e);process.exit(1)});
