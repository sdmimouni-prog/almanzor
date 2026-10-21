const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});let results=[];
 for(const width of [1774,1440,390,768,1920,319]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=800){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(40)}
 await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0)});
 const data=await page.evaluate(()=>{const top=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,maison:top(document.querySelector('.editorial-maison')),univers:top(document.querySelector('.editorial-univers')),title:top(document.querySelector('#maison-title')),storyButton:top(document.querySelector('.editorial-maison .button')),cards:[...document.querySelectorAll('.editorial-univers .universe-card')].map(top),missing:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)}});
 assert.equal(data.scrollWidth,width);assert.deepEqual(data.missing,[]);await page.screenshot({path:__dirname+`/full-${width}.png`,fullPage:true});
 await page.locator('.editorial-maison [data-story]').click();assert.equal(await page.locator('dialog').isVisible(),true);assert.equal(await page.locator('#dialog-title').innerText(),'L’art du parfum');await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
 await page.locator('.editorial-univers .perfumes-card').click();assert.equal(new URL(page.url()).hash,'#parfums');await page.locator('.editorial-univers .house-card').click();assert.equal(new URL(page.url()).hash,'#sillage');assert.deepEqual(errors,[]);results.push({...data,errors,interactions:'passed'});await page.close();
 }
 // The approved Hero must remain visually unchanged at its reference dimensions.
 const p=await browser.newPage({viewport:{width:1672,height:941},deviceScaleFactor:1,reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:__dirname+'/approved-hero-regression.png'});await p.close();
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify(results,null,2));await browser.close();console.log(results.map(x=>({width:x.width,maisonHeight:x.maison.height,universHeight:x.univers.height,errors:x.errors,interactions:x.interactions})));
})().catch(e=>{console.error(e);process.exit(1)});
