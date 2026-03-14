const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'file:///c:/Users/admin/website-romanalabs/index.html';

  // Helper: reveal all hidden elements so full-page screenshot captures them
  async function revealAll(pg) {
    await pg.evaluate(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('visible'));
      // Reveal process groups and display cards
      document.querySelectorAll('.process-group').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.classList.add('cards-visible');
      });
      // Trigger count-up to final values for screenshot
      document.querySelectorAll('.count-up').forEach(el => {
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        el.textContent = prefix + el.dataset.target + suffix;
      });
    });
    await new Promise(r => setTimeout(r, 800));
  }

  // Mobile screenshot
  await page.setViewport({ width: 423, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await revealAll(page);
  await page.screenshot({ path: 'c:/Users/admin/website-romanalabs/screenshot-mobile.png', fullPage: true });
  console.log('Mobile screenshot saved.');

  // Desktop screenshot
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await revealAll(page);
  await page.screenshot({ path: 'c:/Users/admin/website-romanalabs/screenshot-desktop.png', fullPage: true });
  console.log('Desktop screenshot saved.');

  await browser.close();
})();
