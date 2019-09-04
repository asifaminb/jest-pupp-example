const puppeteer = require('puppeteer')
let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath:
      "./node_modules/chromium/lib/chromium/chrome-linux/chrome",
  })
  page = await browser.newPage()
})

describe('SWE templates testing', () => {
  test('has search input', async () => {
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:8086/docs/components.html', { waitUntil: 'networkidle0' })
    await page.type('input[id=qg-search-query]', 'jobs', {delay: 20})
    await page.waitForSelector('.listbox li')
    const list = (await page.$$('.listbox li')).length;
    expect(list).toBeGreaterThan(0);
  }, 10000)

  test('shows search results after search input', async () => {
    const pfel = '#page-feedback-useful';
    await page.waitForSelector(pfel)
    expect(await page.evaluate('window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")')).toBe('none');
    (await page.$(pfel)).click();
    await page.waitFor(3000);
    expect(await page.evaluate('window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")')).not.toBe('none');
  })

  afterAll(async () => {
    await browser.close()
  })
})
