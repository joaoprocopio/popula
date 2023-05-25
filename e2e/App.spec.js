import { test, expect } from '@playwright/test'

// const chart = page.locator('.v-card-text canvas')

test.describe('App', () => {
  /**  @type {Array<import('@playwright/test').Locator>} **/
  let [searchBar, searchResult, geometries, chart, city, geometry] = []

  test.beforeEach(async ({ page }) => {
    searchBar = page.locator('.v-field__input input')
    searchResult = page.locator(
      '.v-autocomplete__content .v-list .v-list-item .v-list-item__content .v-list-item-title'
    )
    geometries = page.locator('.leaflet-interactive')
    chart = page.locator('.v-card-text canvas')

    city = searchResult.first()
    geometry = geometries.first()

    await page.goto('/')
  })

  test('Search for a city', async () => {
    await searchBar.fill('sao jose dos campos')

    expect(await city.textContent()).toContain('São José dos Campos')
    expect(await city.isVisible()).toBeTruthy()
  })

  test('Get neighborhoods of a city', async () => {
    await searchBar.fill('sao jose dos campos')

    await city.click()

    await geometry.waitFor({ state: 'visible' })

    expect(await geometry.isVisible()).toBeTruthy()
  })

  test('Get chart of a neighborhood', async () => {
    await searchBar.fill('sao jose dos campos')

    await city.click()

    await geometry.waitFor({ state: 'visible' })

    await geometry.click()

    await chart.waitFor({ state: 'visible' })

    expect(await chart.isVisible()).toBeTruthy()
  })
})
