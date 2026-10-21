const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const page = await browser.newPage({ viewport: { width: 1536, height: 1050 }, reducedMotion: 'no-preference' });
  const errors = [], report = {};
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  const scroll = selector => page.locator(selector).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  const opacity = selector => page.locator(selector).evaluateAll(items => items.map(el => Number(getComputedStyle(el).opacity)));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  assert((await opacity('.story-reveal')).every(value => value === 0));
  await scroll('#signature');
  await page.waitForTimeout(180);
  report.signatureEntering = await opacity('.signature-copy > *');
  assert(report.signatureEntering[0] > report.signatureEntering[2]);
  await page.waitForTimeout(1400);
  assert((await opacity('.story-reveal:not(.is-reveal-pending)')).every(value => value === 1));
  await page.screenshot({ path: __dirname + '/desktop-rest.png' });
  await page.locator('.heritage-signature .button').hover();
  await page.waitForTimeout(1250);
  report.signatureHover = await page.locator('#signature').evaluate(el => ({ scale: getComputedStyle(el.querySelector('.signature-image')).scale, arrow: getComputedStyle(el.querySelector('.button img')).translate }));
  assert.equal(report.signatureHover.scale, '1.018');
  assert.equal(report.signatureHover.arrow, '4px');
  await page.locator('#signature').screenshot({ path: __dirname + '/signature-hover.png' });
  await page.locator('.reference-reassurance .service-item').first().hover();
  await page.waitForTimeout(600);
  report.serviceHover = await page.locator('.service-item').first().evaluate(el => ({ icon: getComputedStyle(el.querySelector('img')).transform, text: getComputedStyle(el.querySelector('p')).color }));
  assert(report.serviceHover.icon.includes('1.06'));
  assert.equal(report.serviceHover.text, 'rgb(153, 95, 31)');
  await page.locator('.reference-reassurance').screenshot({ path: __dirname + '/services-hover.png' });
  await page.locator('.reference-instagram .instagram-grid a').first().hover();
  await page.waitForTimeout(800);
  report.galleryHover = await page.locator('.reference-instagram .instagram-grid img').first().evaluate(el => ({ transform: getComputedStyle(el).transform, filter: getComputedStyle(el).filter }));
  assert(report.galleryHover.transform.includes('1.045'));
  assert.equal(report.galleryHover.filter, 'brightness(1.08)');
  await page.screenshot({ path: __dirname + '/services-gallery-hover.png' });
  await page.locator('#inspiration').screenshot({ path: __dirname + '/gallery-hover.png' });
  await page.mouse.move(0, 0);
  await page.keyboard.press('Tab');
  await page.locator('.instagram-grid a').nth(1).focus();
  await page.waitForTimeout(800);
  assert(await page.locator('.instagram-grid a').nth(1).evaluate(el => el.matches(':focus-visible') && getComputedStyle(el.querySelector('img')).transform.includes('1.045')));
  const links = await page.locator('.reference-instagram a').evaluateAll(items => items.map(a => ({ href: a.href, target: a.target, rel: a.rel })));
  assert(links.every(a => a.href === 'https://www.instagram.com/almanzor.parfums/' && a.target === '_blank' && a.rel.includes('noopener')));
  await scroll('.reference-hero');
  await scroll('#signature');
  assert((await opacity('.story-reveal')).every(value => value === 1), 'No entrance replay');
  await page.locator('.heritage-signature .button').click();
  assert.equal(new URL(page.url()).pathname, '/la-maison.html');

  // Observe the cascade when these sections enter separately, further down the page.
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await scroll('#points-de-vente');
  await page.waitForTimeout(160);
  report.serviceEntering = await opacity('.reference-reassurance .service-item');
  report.galleryEntering = await opacity('.reference-instagram .instagram-grid a');
  assert(report.serviceEntering[0] > report.serviceEntering[3]);
  assert(report.galleryEntering[0] > report.galleryEntering[5]);
  await page.waitForTimeout(1300);
  assert((await opacity('.reference-reassurance .service-item, .reference-instagram .instagram-grid a')).every(value => value === 1));

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  await scroll('#points-de-vente');
  await page.locator('.reference-reassurance .service-item').first().hover();
  assert.equal(await page.locator('.service-item img').first().evaluate(el => getComputedStyle(el).transform), 'none');
  await page.locator('.instagram-grid a').first().hover();
  assert.equal(await page.locator('.instagram-grid img').first().evaluate(el => getComputedStyle(el).transform), 'none');
  assert.equal(await page.locator('.story-reveal').count(), 0);

  report.mobile = [];
  for (const width of [390, 319]) {
    const mobile = await browser.newPage({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
    mobile.on('pageerror', e => errors.push(e.message));
    await mobile.goto('http://127.0.0.1:4173/#signature', { waitUntil: 'networkidle' });
    for (const selector of ['#signature', '#points-de-vente', '#inspiration', '.instagram-grid a:last-child']) {
      await mobile.locator(selector).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await mobile.waitForTimeout(1100);
    }
    const data = await mobile.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, hidden: [...document.querySelectorAll('.story-reveal')].filter(el => getComputedStyle(el).opacity !== '1').length }));
    assert.equal(data.width, data.scrollWidth);
    assert.equal(data.hidden, 0);
    await mobile.locator('#points-de-vente').screenshot({ path: __dirname + `/services-${width}.png` });
    await mobile.locator('#inspiration').screenshot({ path: __dirname + `/gallery-${width}.png` });
    report.mobile.push(data);
    await mobile.close();
  }

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('.instagram-grid a').last().focus();
  assert.equal(await page.locator('.instagram-grid a').last().evaluate(el => getComputedStyle(el).opacity), '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert((await opacity('.story-reveal')).every(value => value === 1));
  assert.deepEqual(errors, []);
  report.errors = errors;
  report.result = 'passed';
  await fs.writeFile(__dirname + '/checks.json', JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
