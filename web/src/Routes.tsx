// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import ReactGA from 'react-ga'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HomeLayout}>
        {ReactGA.pageview(window.location.pathname + window.location.search)}
        <Route path="/stewards" page={ClaimAndDelegatePage} name="claimAndDelegate" />
        <Route path="/claim" page={ClaimPage} name="claim" />
        {/* <Route path="/admin" page={AdminPage} name="admin" /> */}
        <Route path="/gallery" page={GalleryPage} name="gallery" />
        {/* <Route path="/mint" page={MintPage} name="mint" /> */}
        <Route path="/" page={HomePage} name="home" />
        {/* <Route path="/rainbowlist" page={AllowlistPage} name="allowlist" /> */}
        <Route path="/pridepunk/{id:Int}" page={PridepunkPage} name="pridepunk" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
