import { Flex, Image, Spacer } from '@chakra-ui/react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import { useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import wrongNetwork from './0047-wrongNetwork.jpg'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [network, switchNetwork] = useNetwork()
  const toast = useToast()

  useEffect(() => {
    if (network?.data?.chain?.name && network?.data?.chain?.name != 'Mainnet') {
      toast({
        title: 'Switch to Mainnet.',
        description: 'Please connect your wallet and switch to Mainnet.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [network?.data?.chain])

  // if (network?.data?.chain?.name && network?.data?.chain?.name != 'Mainnet') {
  //   return (
  //     <Flex minWidth={'100vw'} minHeight={'100vh'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
  //       {' '}
  //       Wrong Network. Please switch to Ethereum Mainnet.{' '}
  //       <Image src={wrongNetwork} />
  //     </Flex>
  //   )
  // }

  return (
    <Flex flexDirection="column" minHeight="100%" height="100%">
      <Header />
      {children}
      <Footer />
    </Flex>
  )
}

export default HomeLayout
