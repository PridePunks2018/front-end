import { render } from '@redwoodjs/testing/web'

import ScrollPunkSlider from './ScrollPunkSlider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScrollPunkSlider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScrollPunkSlider />)
    }).not.toThrow()
  })
})
