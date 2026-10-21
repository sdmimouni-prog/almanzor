const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});let results=[];
 for(const width of [1536,1440,390,768,1920,319]) {
 const p=await browser.newPage({viewport:{width,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=800){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(25)}
 await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0)});
 const data=await p.evaluate(()=>{const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,selection:box(document.querySelector('.reference-selection')),craft:box(document.querySelector('.reference-craft')),missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}});
 assert.equal(data.scrollWidth,width);assert.deepEqual(data.missing,[]);await p.screenshot({path:__dirname+`/full-${width}.png`,fullPage:true});
 for(const [key,name] of [['blade','BLADE'],['yaya','YAYA'],['monsieur-rouge','MONSIEUR ROUGE'],['black-eden','BLACK EDEN']]) {await p.locator(`#${key} .button`).click();assert.equal(await p.locator('#dialog-title').innerText(),name);await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.body.classList.contains('modal-open'))}
 const order=()=>p.locator('#collection-grid .product').evaluateAll(es=>es.map(e=>e.id));const initial=await order();await p.locator('.collection-next').click();assert.deepEqual(await order(),[...initial.slice(1),initial[0]]);await p.locator('.collection-prev').click();assert.deepEqual(await order(),initial);
 for(let i=0;i<4;i++)await p.locator('.collection-next').click();assert.deepEqual(await order(),initial);
 await p.locator('.craft-button').click();assert.equal(await p.locator('#dialog-title').innerText(),'L’excellence dans chaque détail');await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.body.classList.contains('modal-open'));assert.deepEqual(errors,[]);
 results.push({...data,interactions:'passed',errors});await p.close();
 }
 for(const [width,height,name] of [[1672,941,'hero-regression'],[1774,1000,'editorial-regression']]) {const p=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);if(width===1774){await p.locator('#univers').scrollIntoViewIfNeeded();await p.evaluate(async()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));const y=await p.locator('#maison').evaluate(e=>e.getBoundingClientRect().y+scrollY);await fs.writeFile(__dirname+'/editorial-origin.json',JSON.stringify({y}));}await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:__dirname+`/${name}.png`,fullPage:width===1774});await p.close();}
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify(results,null,2));console.log(results);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
