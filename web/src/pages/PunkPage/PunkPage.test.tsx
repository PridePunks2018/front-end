import { render } from '@redwoodjs/testing/web'

import PunkPage from './PunkPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PunkPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PunkPage />)
    }).not.toThrow()
  })
})
