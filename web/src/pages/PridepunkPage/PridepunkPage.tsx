import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const PridepunkPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Pridepunk" description="Pridepunk page" />
      <h1>PridepunkPage</h1>
      <p>
        Find me in <code>./web/src/pages/PridepunkPage/PridepunkPage.tsx</code>
      </p>
      <p>
        My default route is named <code>pridepunk</code>, link to me with `
        <Link to={routes.pridepunk()}>Pridepunk</Link>`
      </p>
    </>
  )
}

export default PridepunkPage
