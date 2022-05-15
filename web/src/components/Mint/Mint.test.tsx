import { render } from '@redwoodjs/testing/web'

import Mint from './Mint'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Mint', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Mint />)
    }).not.toThrow()
  })
})
