import { test, expect } from '@playwright/test'

// const city = page.getByText('São José dos Campos')
// const input = page.locator('.v-field__input input')
// const geometries = page.locator('.leaflet-interactive')
// const chart = page.locator('.v-card-text canvas')

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Search for a city and a city option is rendered', async ({ page }) => {
    const input = page.locator('.v-field__input input')
    const city = page.getByText('São José dos Campos')

    await input.fill('sao jose')

    await city.waitFor({ state: 'visible' })

    expect(await city.isVisible()).toBeTruthy()
  })
})
