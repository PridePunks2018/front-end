import { render } from '@redwoodjs/testing/web'

import PunkAvatar from './PunkAvatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PunkAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PunkAvatar />)
    }).not.toThrow()
  })
})
