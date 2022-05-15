import { render } from '@redwoodjs/testing/web'

import Account from './Account'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Account', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Account />)
    }).not.toThrow()
  })
})
