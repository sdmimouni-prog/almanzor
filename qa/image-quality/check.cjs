const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
const routes=['index','nos-parfums','la-maison'];
const sizes=[[1920,1080],[1512,982],[768,1024],[390,844],[319,568]];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 await fs.mkdir(__dirname+'/after',{recursive:true});
 for(const route of routes)for(const [width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:2,reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.goto(`http://127.0.0.1:4173/${route}.html`,{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(imgs=>{imgs.forEach(img=>img.loading='eager');return Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
  const state=await page.evaluate(()=>({
   width:document.documentElement.scrollWidth,
   images:[...document.images].map(img=>{const box=img.getBoundingClientRect();return {src:img.currentSrc.split('/').pop(),natural:[img.naturalWidth,img.naturalHeight],render:[Math.round(box.width),Math.round(box.height)],loaded:img.complete&&img.naturalWidth>0};}),
   instagramPrompt:document.body.textContent.includes('Suivez-nous sur Instagram'),
  }));
  assert.equal(state.width,width,`${route} ${width}: horizontal overflow`);
  assert.deepEqual(state.images.filter(img=>!img.loaded),[],`${route} ${width}: missing photographs`);
  assert.equal(state.instagramPrompt,false);assert.deepEqual(errors,[]);
  if(width===1512){
   const sections=page.locator('main > section');
   for(let n=0;n<await sections.count();n++)await sections.nth(n).screenshot({path:`${__dirname}/after/${route}-${String(n+1).padStart(2,'0')}.png`,animations:'disabled'});
  }
  if(width===390){await page.screenshot({path:`${__dirname}/after/${route}-mobile.png`,fullPage:true});}
  if(route==='nos-parfums'&&(width===1512||width===390)){
   for(const product of ['blade','yaya','monsieur-rouge','black-eden']){
    await page.locator(`[data-product="${product}"]`).first().click();
    const image=page.locator('#detail-dialog .product-detail > img');
    await image.evaluate(img=>img.decode());
    assert((await image.getAttribute('src')).includes('-hd.webp'));
    assert.equal(await image.evaluate(img=>getComputedStyle(img).objectFit),'contain');
    await page.keyboard.press('Escape');
   }
  }
  results.push({route,width,height,errors,...state});
  console.log(`${route} ${width}: ${state.images.length} images loaded, no overflow or errors`);
  await page.close();
 }
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify({result:'passed',results},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
