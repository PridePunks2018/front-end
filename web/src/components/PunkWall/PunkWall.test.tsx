import { render } from '@redwoodjs/testing/web'

import PunkWall from './PunkWall'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PunkWall', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PunkWall />)
    }).not.toThrow()
  })
})
