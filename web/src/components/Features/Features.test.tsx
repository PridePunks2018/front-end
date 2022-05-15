import { render } from '@redwoodjs/testing/web'

import Features from './Features'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Features', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Features />)
    }).not.toThrow()
  })
})
