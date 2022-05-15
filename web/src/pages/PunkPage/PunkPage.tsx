import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const PunkPage = () => {
  return (
    <>
      <MetaTags title="Punk" description="Punk page" />

      <h1>PunkPage</h1>
      <p>
        Find me in <code>./web/src/pages/PunkPage/PunkPage.tsx</code>
      </p>
      <p>
        My default route is named <code>punk</code>, link to me with `
        <Link to={routes.punk()}>Punk</Link>`
      </p>
    </>
  )
}

export default PunkPage
