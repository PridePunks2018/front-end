import { render } from '@redwoodjs/testing/web'

import PridepunkPage from './PridepunkPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PridepunkPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PridepunkPage />)
    }).not.toThrow()
  })
})
