const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'}),results=[];
 for(const width of [1536,1440,390,768,1920,319]) {
  const p=await b.newPage({viewport:{width,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=800){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(25)}
  await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0)});
  const data=await p.evaluate(()=>{const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,signature:box(document.querySelector('#signature')),services:box(document.querySelector('.reference-reassurance')),instagram:box(document.querySelector('#inspiration')),selection:box(document.querySelector('#parfums')),missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}});
  assert.equal(data.width,data.scrollWidth);assert.deepEqual(data.missing,[]);assert.equal(await p.locator('.reference-reassurance .service-item').count(),4);assert.equal(await p.locator('.reference-instagram .instagram-grid a').count(),6);
  await p.screenshot({path:__dirname+`/full-${width}.png`,fullPage:true});
  await p.locator('.reference-signature .button').focus();await p.keyboard.press('Enter');assert.equal(new URL(p.url()).hash,'#maison');
  const links=await p.locator('.reference-instagram a').evaluateAll(es=>es.map(a=>({href:a.href,target:a.target,rel:a.rel})));
  assert.equal(links.length,7);for(const l of links){assert.equal(l.href,'https://www.instagram.com/almanzor.parfums/');assert.equal(l.target,'_blank');assert(l.rel.includes('noopener'))}
  assert.deepEqual(errors,[]);results.push({...data,links,interactions:'passed',errors});await p.close();
 }
 for(const [width,height,name] of [[1672,941,'hero-regression'],[1774,1000,'editorial-regression']]) {const p=await b.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);if(width===1774){await p.locator('#univers').scrollIntoViewIfNeeded();await p.evaluate(async()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));await fs.writeFile(__dirname+'/editorial-origin.json',JSON.stringify({y:await p.locator('#maison').evaluate(e=>e.getBoundingClientRect().y+scrollY)}))}await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:__dirname+`/${name}.png`,fullPage:width===1774});await p.close()}
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify(results,null,2));await b.close();console.log(results.map(r=>({width:r.width,signatureHeight:r.signature.height,servicesHeight:r.services.height,instagramHeight:r.instagram.height,errors:r.errors,interactions:r.interactions})));
})().catch(e=>{console.error(e);process.exit(1)});
