import { render } from '@redwoodjs/testing/web'

import Faq from './Faq'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Faq', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Faq />)
    }).not.toThrow()
  })
})
