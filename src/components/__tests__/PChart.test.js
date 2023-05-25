import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { PChart } from '..'

const render = (props = {}) => mount(PChart, { props })

describe('PChart', () => {
  const wrapper = render({
    label: 'Test',
    labels: ['A', 'B', 'C'],
    dataset: [1, 2, 3],
  })

  test('Variant bar should render bar chart', async () => {
    await wrapper.setProps({ variant: 'bar' })

    expect(wrapper.get(['[data-test-id="bar-chart"]'])).toBeTruthy()
  })

  test('Variant line should render line chart', async () => {
    await wrapper.setProps({ variant: 'line' })

    expect(wrapper.get(['[data-test-id="line-chart"]'])).toBeTruthy()
  })
})
