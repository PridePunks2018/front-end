import { render } from '@redwoodjs/testing/web'

import ClaimAndDelegatePage from './ClaimAndDelegatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClaimAndDelegatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClaimAndDelegatePage />)
    }).not.toThrow()
  })
})
