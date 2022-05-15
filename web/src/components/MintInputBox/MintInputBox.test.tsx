import { render } from '@redwoodjs/testing/web'

import MintInputBox from './MintInputBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MintInputBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintInputBox />)
    }).not.toThrow()
  })
})
