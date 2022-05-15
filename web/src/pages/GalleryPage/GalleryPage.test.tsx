import { render } from '@redwoodjs/testing/web'

import GalleryPage from './GalleryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GalleryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GalleryPage />)
    }).not.toThrow()
  })
})
