const timeout = 5000


describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:8086/')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('Autocomplete is working as expected', async () => {
      await page.type('input[id=qg-search-query]', 'jobs', {delay: 20})
      await page.waitForSelector('.listbox li')
      const list = (await page.$$('.listbox li')).length;
      expect(list).toBeGreaterThan(0);
    })
    it('Feedback form is working as expected', async () => {
      expect(await page.evaluate('window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")')).toBe('none');
      (await page.$('#page-feedback-useful')).click();
      await page.waitForSelector('#page-feedback-about-this-website')
      await page.click('input[name=page-feedback-about]')
      expect(await page.evaluate('window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")')).not.toBe('none');
    });
  },
  timeout
)
