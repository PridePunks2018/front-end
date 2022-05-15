import { render } from '@redwoodjs/testing/web'

import DelegateCard from './DelegateCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DelegateCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DelegateCard />)
    }).not.toThrow()
  })
})
