import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { MetaTags } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import ReactGA from 'react-ga'

import { ChakraProvider, Flex, Image } from '@chakra-ui/react'
import {
  Provider,
  defaultChains,
  chain,
  developmentChains,
  defaultL2Chains,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'
import { Connector } from 'wagmi'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import './index.css'

// Get environment variables
const infuraId = process.env.INFURA_ID as string
const alchemyId = process.env.ALCHEMY_ID as string
const etherscanApiKey = process.env.ETHERSCAN as string

// const provider = ({ chainId }) => {
//   // if (process.env.NODE_ENV == 'development') {
//   //   return new providers.JsonRpcProvider('http://127.0.0.1:8545/')
//   // }
//   // return new providers.InfuraProvider(chainId, infuraId)
//   return new providers.AlchemyProvider(
//     chainId,
//     `BzJfQ9KGENwP7o9XoN3_GQVTpDYwOcLm`
//   )
// }

// Pick chains
const chains = defaultChains
const defaultChain = chain.mainnet

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Pride Punk App',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector }
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyId,
      etherscan: etherscanApiKey,
      infura: infuraId,
    }
  )
const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined


const App = () => {
ReactGA.initialize(process.env.GA_ID)

  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <ChakraProvider>
        <FatalErrorBoundary page={FatalErrorPage}>
          <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <RedwoodApolloProvider>
              <Routes />
              <MetaTags
                title="PridePunks 2018"
                description="The homepage for the PridePunk 2018 project"
                ogUrl="https://www.pridepunk.xyz"
                robots={['nofollow']}
              />
            </RedwoodApolloProvider>
          </RedwoodProvider>
        </FatalErrorBoundary>
      </ChakraProvider>
    </Provider>
  )
}

export default App
