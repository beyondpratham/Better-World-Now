const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({ viewport: { width: 1728, height: 1200 } });
  const page = await context.newPage();
  await page.goto('http://localhost:1234/desktop-12.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: process.argv[2], fullPage: true });
  await browser.close();
})();
