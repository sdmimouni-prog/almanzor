const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const context=await browser.newContext({viewport:{width:1440,height:810},recordVideo:{dir:__dirname+'/recordings',size:{width:1280,height:720}},reducedMotion:'no-preference'});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(1700);
 const bottom=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
 for(let top=360;top<bottom+360;top+=360){
  await page.evaluate(top=>scrollTo({top,behavior:'smooth'}),Math.min(top,bottom));
  await page.waitForTimeout(1250);
 }
 await page.waitForTimeout(1000);
 const video=page.video();await context.close();
 await video.saveAs(__dirname+'/scroll-preview.webm');
 await browser.close();console.log('Recorded scroll-preview.webm');
})().catch(e=>{console.error(e);process.exit(1)});
