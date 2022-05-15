import { render } from '@redwoodjs/testing/web'

import Ticker from './Ticker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Ticker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Ticker />)
    }).not.toThrow()
  })
})
