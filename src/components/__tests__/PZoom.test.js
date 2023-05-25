import { mount } from '@vue/test-utils'

import { describe, expect, test } from 'vitest'

import { PZoom } from '..'

const render = (config = {}) => mount(PZoom, config)

describe('PZoom', () => {
  const wrapper = render()

  test('On click should emit "zoomOut"', async () => {
    await wrapper.get('[data-testid="zoomOut"]').trigger('click')

    expect(wrapper.emitted().zoomOut).toBeTruthy()
  })

  test('On click should emit "zoomIn"', async () => {
    await wrapper.get('[data-testid="zoomIn"]').trigger('click')

    expect(wrapper.emitted().zoomIn).toBeTruthy()
  })
})
