const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference',recordVideo:{dir:__dirname+'/recordings',size:{width:1280,height:800}}});
 const page=await context.newPage();
 for(const route of ['nos-parfums.html','la-maison.html']){
  await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1900);
  const tops=await page.locator('main > section,footer').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top+scrollY));
  for(const top of tops.slice(1)){
   await page.evaluate(top=>scrollTo({top:Math.max(0,top-60),behavior:'smooth'}),top);
   await page.waitForTimeout(2000);
  }
 }
 const video=page.video();await context.close();
 await video.saveAs(__dirname+'/all-pages-scroll-preview.webm');await browser.close();
 console.log('Recorded all-pages-scroll-preview.webm');
})().catch(e=>{console.error(e);process.exit(1)});
