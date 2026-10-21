const {chromium}=require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const fs=require('node:fs/promises');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const results=[];
 for(const width of [1672,1440,390,768,1920]){
 const page=await browser.newPage({viewport:{width,height:width===1672?941:1000},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${__dirname}/hero-${width}.png`,clip:{x:0,y:0,width,height:Math.round((await page.locator('.reference-hero').boundingBox()).height)}});
 results.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,hero:document.querySelector('.reference-hero').getBoundingClientRect().toJSON(),title:document.querySelector('h1').getBoundingClientRect().toJSON(),paragraph:document.querySelector('.hero-content p').getBoundingClientRect().toJSON(),cta:document.querySelector('.hero-content .button').getBoundingClientRect().toJSON(),nav:[...document.querySelectorAll('.navigation a')].map(x=>({text:x.textContent.trim(),bounds:x.getBoundingClientRect().toJSON()}))})));if(errors.length)throw Error(errors.join('\n'));
 if(width===390||width===768){await page.locator('.menu-button').click();if(await page.locator('.menu-button').getAttribute('aria-expanded')!=='true')throw Error('Menu');await page.keyboard.press('Escape');}
 await page.getByRole('button',{name:'Rechercher un parfum'}).click();await page.getByRole('searchbox').fill('yaya');if(await page.locator('.search-results a').count()!==1)throw Error('Search');await page.keyboard.press('Escape');
 if(errors.length)throw Error(errors.join('\n'));await page.close();}
 await fs.writeFile(`${__dirname}/checks.json`,JSON.stringify(results,null,2));await browser.close();console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
