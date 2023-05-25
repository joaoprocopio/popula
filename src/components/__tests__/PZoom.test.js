import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { describe, expect, test } from 'vitest'

import { PZoom } from '..'

const wrapper = () => render(PZoom, {})

describe('PZoom', () => {
  const user = userEvent.setup()
  const { emitted, getByTestId } = wrapper()

  test('On click should emit "zoomOut"', async () => {
    await user.click(getByTestId('zoomOut'))

    expect(emitted().zoomOut).toBeTruthy()
  })
  test('On click should emit "zoomIn"', async () => {
    await user.click(getByTestId('zoomIn'))

    expect(emitted().zoomIn).toBeTruthy()
  })
})
