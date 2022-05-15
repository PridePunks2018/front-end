import { render } from '@redwoodjs/testing/web'

import PpCard from './PpCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PpCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PpCard />)
    }).not.toThrow()
  })
})
