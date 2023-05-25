import { test, expect } from '@playwright/test'

// const chart = page.locator('.v-card-text canvas')

test.describe('App', () => {
  let searchbar
  let cities
  let geometries
  let chart

  test.beforeEach(async ({ page }) => {
    searchbar = page.locator('.v-field__input input')
    cities = page.locator(
      '.v-autocomplete__content .v-list .v-list-item .v-list-item__content .v-list-item-title'
    )
    geometries = page.locator('.leaflet-interactive')
    chart = page.locator('.v-card-text canvas')

    await page.goto('/')
  })

  test('Search for a city', async () => {
    const city = cities.first()

    await searchbar.fill('sao jose dos campos')

    await city.waitFor({ state: 'visible' })

    expect(await city.textContent()).toContain('São José dos Campos')
    expect(await city.isVisible()).toBeTruthy()
  })
})
