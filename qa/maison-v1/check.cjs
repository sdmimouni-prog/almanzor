const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'}),results=[];
 async function load(p,url){await p.goto(url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=850){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(20)}await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0)})}
 for(const width of [1540,1440,390,768,1920,319,1024]){
  const p=await b.newPage({viewport:{width,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await load(p,'http://127.0.0.1:4173/la-maison.html');
  const data=await p.evaluate(()=>{const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sections:[...document.querySelectorAll('main > section')].map(s=>({classes:s.className,...box(s)})),footer:box(document.querySelector('footer')),missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}});
  assert.equal(data.width,data.scrollWidth);assert.deepEqual(data.missing,[]);assert.equal(await p.locator('main > section').count(),8);await p.screenshot({path:__dirname+`/full-${width}.png`,fullPage:true});
  await p.getByRole('link',{name:'Notre histoire',exact:true}).click();assert.equal(new URL(p.url()).hash,'#histoire');
  await p.getByRole('button',{name:'Notre savoir-faire',exact:true}).click();assert.equal(await p.locator('#dialog-title').innerText(),'Des matières nobles et rares.');await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  await p.locator('#email').fill('verification@example.com');await p.locator('#newsletter-form button').click();assert((await p.locator('#newsletter-status').innerText()).includes('ni enregistrée'));
  if(width<1200){await p.locator('.menu-button').click();assert.equal(await p.locator('.menu-button').getAttribute('aria-expanded'),'true');assert.equal(await p.locator('#navigation a[aria-current="page"]').innerText(),'La Maison');await p.keyboard.press('Escape');assert.equal(await p.locator('.menu-button').getAttribute('aria-expanded'),'false')}
  await p.locator('.search-button').click();await p.locator('#perfume-search').fill('ROUGE');await p.locator('.search-results a').click();assert.equal(new URL(p.url()).pathname,'/nos-parfums.html');assert.equal(new URL(p.url()).hash,'#monsieur-rouge');
  assert.deepEqual(errors,[]);results.push({...data,errors,interactions:'passed'});await p.close();
 }
 const p=await b.newPage({viewport:{width:1440,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'});
 await load(p,'http://127.0.0.1:4173/');await p.screenshot({path:__dirname+'/home-regression.png',fullPage:true});
 const homeShared=await p.evaluate(()=>({header:document.querySelector('header').textContent,footer:document.querySelector('footer').textContent,footerImages:[...document.querySelectorAll('footer img')].map(i=>i.getAttribute('src'))}));
 await p.locator('#navigation').getByRole('link',{name:'La Maison',exact:true}).click();assert.equal(new URL(p.url()).pathname,'/la-maison.html');
 const shared=await p.evaluate(()=>({header:document.querySelector('header').textContent,footer:document.querySelector('footer').textContent,footerImages:[...document.querySelectorAll('footer img')].map(i=>i.getAttribute('src'))}));assert.deepEqual(shared,homeShared);
 await p.getByRole('link',{name:'Découvrir nos parfums',exact:true}).click();assert.equal(new URL(p.url()).pathname,'/nos-parfums.html');await load(p,p.url());await p.screenshot({path:__dirname+'/catalog-regression.png',fullPage:true});await p.locator('#navigation').getByRole('link',{name:'La Maison',exact:true}).click();assert.equal(new URL(p.url()).pathname,'/la-maison.html');
 await fs.writeFile(__dirname+'/checks.json',JSON.stringify(results,null,2));await fs.writeFile(__dirname+'/shared-layout.json',JSON.stringify({headerAndFooterContent:'identical',homeAndCatalogNavigation:'passed',perfumeCta:'passed',searchProductTarget:'passed'},null,2));await b.close();console.log(results.map(r=>({width:r.width,height:r.footer.y,errors:r.errors,interactions:r.interactions})));
})().catch(e=>{console.error(e);process.exit(1)});
