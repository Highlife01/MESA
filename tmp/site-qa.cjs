const { chromium } = require('C:/Users/USER/AppData/Roaming/interpreter/oo-editors/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const url = process.argv[2] || 'http://127.0.0.1:3000/';
  const outDir = path.join(__dirname, 'screenshots');
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });
  try {
    for (const [name, width, height, isMobile] of [['desktop', 1440, 1050, false], ['mobile', 390, 844, true]]) {
      const page = await browser.newPage({ viewport: { width, height }, isMobile, deviceScaleFactor: 1, hasTouch: isMobile });
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1100);
      await page.screenshot({ path: path.join(outDir, `${name}-viewport.png`) });
      await page.screenshot({ path: path.join(outDir, `${name}-full.png`), fullPage: true });
      const report = await page.evaluate(() => ({
        title: document.title,
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        h1: [...document.querySelectorAll('h1')].map(el => el.innerText),
        brokenImages: [...document.images].filter(el => !el.complete || el.naturalWidth === 0).map(el => el.src),
        links: [...document.querySelectorAll('main a')].map(el => ({ text: el.innerText.trim(), href: el.getAttribute('href') })),
        buttons: [...document.querySelectorAll('button')].map(el => ({ text: el.innerText.trim(), label: el.getAttribute('aria-label') })),
        horizontalOverflow: [...document.querySelectorAll('body *')].filter(el => {
          const box = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return style.position !== 'fixed' && style.visibility !== 'hidden' && box.width > 0 && box.right > innerWidth + 1;
        }).slice(0, 15).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent.trim().slice(0, 70) })),
      }));
      console.log(JSON.stringify({ name, pageErrors, ...report }, null, 2));
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exit(1); });
