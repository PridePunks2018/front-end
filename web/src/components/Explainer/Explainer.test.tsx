import { render } from '@redwoodjs/testing/web'

import Explainer from './Explainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Explainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Explainer />)
    }).not.toThrow()
  })
})
