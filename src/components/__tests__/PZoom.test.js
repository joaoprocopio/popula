import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { PZoom } from '..'

const render = (props = {}) => mount(PZoom, { props })

describe('PZoom', () => {
  const wrapper = render()

  test('On click should emit "zoomOut"', async () => {
    await wrapper.get('[data-test-id="zoom-out"]').trigger('click')

    expect(wrapper.emitted().zoomOut).toBeTruthy()
  })

  test('On click should emit "zoomIn"', async () => {
    await wrapper.get('[data-test-id="zoom-in"]').trigger('click')

    expect(wrapper.emitted().zoomIn).toBeTruthy()
  })
})
