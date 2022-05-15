import { render } from '@redwoodjs/testing/web'

import MintPage from './MintPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MintPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintPage />)
    }).not.toThrow()
  })
})
