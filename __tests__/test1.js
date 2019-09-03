const timeout = 15000


describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      jest.setTimeout(7000000);
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:8086/docs/components.html', {waitUntil: 'load', timeout: 700000})
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('Autocomplete is working as expected', async () => {
      await page.type('input[id=qg-search-query]', 'jobs', {delay: 20})
      await page.waitForSelector('.listbox li')
      const list = (await page.$$('.listbox li')).length;
      return expect(list).toBeGreaterThan(0);
    })
  },
  timeout
)
