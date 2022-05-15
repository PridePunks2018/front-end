import { render } from '@redwoodjs/testing/web'

import AllowlistPage from './AllowlistPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AllowlistPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AllowlistPage />)
    }).not.toThrow()
  })
})
