const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'}),results=[];
 for(const [width,height] of [[1512,785],[1440,810],[1366,650],[1672,941],[1920,900],[2560,720],[768,1024],[1024,768],[390,844],[375,667],[319,568],[667,375]]){
  const p=await b.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const data=await p.evaluate(()=>{const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right}};return{width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,hero:rect('.reference-hero'),title:rect('#hero-title'),copy:rect('.reference-hero p'),cta:rect('.reference-hero .button'),logo:rect('header .brand'),scene:rect('.reference-hero-scene'),next:rect('#maison'),staticImages:document.querySelectorAll('.reference-hero img.reference-hero-scene').length}});
  assert(Math.abs(data.hero.height-height)<1);assert(Math.abs(data.next.y-height)<1);assert.equal(data.scrollWidth,width);assert(data.cta.bottom<=height,`CTA outside ${width}x${height}: ${data.cta.bottom}`);assert(data.cta.right<=width);assert.equal(data.staticImages,1);assert.deepEqual(errors,[]);
  await p.screenshot({path:__dirname+`/hero-${width}x${height}.png`});
  if(width<1200){await p.locator('.menu-button').click();assert.equal(await p.locator('.menu-button').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape')}
  await p.locator('.reference-hero .button').click();assert.equal(new URL(p.url()).pathname,'/nos-parfums.html');results.push({...data,errors});await p.close();
 }
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify(results,null,2));await b.close();console.log(results.map(r=>({viewport:`${r.width}x${r.height}`,hero:r.hero.height,ctaBottom:r.cta.bottom,errors:r.errors})));
})().catch(e=>{console.error(e);process.exit(1)});
