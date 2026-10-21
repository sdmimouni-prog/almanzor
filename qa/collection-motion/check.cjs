const { chromium } = require('/Users/salaheddinemimouni/Library/Caches/ms-playwright-go/1.57.0/package');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Users/salaheddinemimouni/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const page = await browser.newPage({ viewport: { width: 1536, height: 960 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const report = {};
  const state = () => page.locator('#collection-grid .product').evaluateAll(cards => cards.map(card => ({ id: card.id, opacity: Number(getComputedStyle(card).opacity), translate: getComputedStyle(card).translate, pending: card.classList.contains('is-reveal-pending') })));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  report.initial = await state();
  assert(report.initial.every(card => card.pending && card.opacity === 0));
  assert.equal(await page.locator('.reference-hero').evaluate(el => el.offsetHeight), 960);
  await page.locator('#parfums').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(180);
  report.entering = await state();
  assert(report.entering[0].opacity > report.entering[3].opacity, 'Cards must enter in sequence');
  await page.screenshot({ path: __dirname + '/entering.png' });
  await page.waitForTimeout(1100);
  report.visible = await state();
  assert(report.visible.every(card => card.opacity === 1 && !card.pending));
  await page.locator('#parfums').screenshot({ path: __dirname + '/selection-rest.png' });
  await page.locator('#blade .product-image').hover();
  await page.waitForTimeout(700);
  report.hover = await page.locator('#blade').evaluate(card => ({ transform: getComputedStyle(card.querySelector('.product-image img')).transform, button: getComputedStyle(card.querySelector('.button')).backgroundColor, arrow: getComputedStyle(card.querySelector('.button img')).transform }));
  assert(report.hover.transform.includes('1.025'));
  assert.equal(report.hover.button, 'rgb(183, 134, 67)');
  assert(report.hover.arrow.includes('4'));
  await page.locator('#parfums').screenshot({ path: __dirname + '/selection-hover.png' });
  await page.locator('#blade .button').click();
  await page.waitForURL('**/blade.html');
  assert.equal(await page.locator('#blade-title').textContent(), 'BLADE');
  await page.goBack({waitUntil:'networkidle'});
  await page.mouse.move(0, 0);
  await page.locator('.collection-next').click();
  assert.equal(await page.locator('#collection-grid .product').first().getAttribute('id'), 'yaya');
  await page.locator('.collection-prev').click();
  await page.keyboard.press('Tab');
  await page.locator('#blade .product-image').focus();
  await page.waitForTimeout(700);
  report.keyboard = await page.locator('#blade .product-image').evaluate(el => ({ visibleFocus: el.matches(':focus-visible'), transform: getComputedStyle(el.querySelector('img')).transform }));
  assert(report.keyboard.visibleFocus);
  assert(report.keyboard.transform.includes('1.025'));
  await page.locator('#parfums').screenshot({ path: __dirname + '/selection-keyboard.png' });
  await page.locator('.reference-hero').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.locator('#parfums').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  assert((await state()).every(card => card.opacity === 1 && !card.pending), 'Entrance must play only once');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('#parfums').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.locator('#blade .product-image').hover();
  report.reduced = await page.locator('#blade').evaluate(el => ({ opacity: getComputedStyle(el).opacity, imageTransform: getComputedStyle(el.querySelector('.product-image img')).transform, animations: el.getAnimations({ subtree: true }).length }));
  assert.equal(report.reduced.opacity, '1');
  assert.equal(report.reduced.imageTransform, 'none');
  assert.equal(report.reduced.animations, 0);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('#black-eden .button').focus();
  assert.equal(await page.locator('#black-eden').evaluate(el => getComputedStyle(el).opacity), '1', 'Keyboard focus immediately reveals a pending card');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert((await state()).every(card => card.opacity === 1), 'Changing motion settings must reveal pending content');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto('http://127.0.0.1:4173/#parfums', { waitUntil: 'networkidle' });
  for (const id of ['blade', 'yaya', 'monsieur-rouge', 'black-eden']) {
    await mobile.locator('#' + id).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await mobile.waitForTimeout(950);
    assert.equal(await mobile.locator('#' + id).evaluate(el => getComputedStyle(el).opacity), '1');
  }
  await mobile.locator('#parfums').screenshot({ path: __dirname + '/selection-mobile.png' });
  report.mobile = await mobile.evaluate(() => ({ viewport: innerWidth, contentWidth: document.documentElement.scrollWidth }));
  assert.equal(report.mobile.viewport, report.mobile.contentWidth);
  await mobile.locator('#black-eden .button').tap();
  await mobile.waitForURL('**/black-eden.html');
  assert.equal((await mobile.locator('h1').textContent()).trim(), 'BLACK EDEN');

  for (const route of ['nos-parfums.html', 'la-maison.html']) {
    await page.goto('http://127.0.0.1:4173/' + route, { waitUntil: 'networkidle' });
  }
  assert.deepEqual(errors, []);
  report.errors = errors;
  report.result = 'passed';
  await fs.writeFile(__dirname + '/checks.json', JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
