import { useConnect, useNetwork, useAccount } from 'wagmi'
import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  useMediaQuery,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag,
  TagLabel,
  Avatar,
} from '@chakra-ui/react'
import { useEffect } from 'react'

import MetaMask from './Fox.png'
import Coinbase from './coinbase.png'
import WalletConnect from './walletConnect.png'
import EthereumLogo from './EthereumLogo.png'

const WalletImage = ({ name }) => {
  if (name == 'MetaMask')
    return (
      <>
        <Image src={MetaMask} maxHeight={'70%'} marginRight={'5px'} />
      </>
    )

  if (name == 'Coinbase Wallet')
    return (
      <>
        <Image src={Coinbase} maxHeight={'70%'} marginRight={'5px'} />
      </>
    )

  if (name == 'WalletConnect')
    return (
      <>
        <Image src={WalletConnect} maxHeight={'70%'} marginRight={'5px'} />
      </>
    )

  return <></>
}

const Connect = () => {
  const [network, switchNetwork] = useNetwork()
  const [account, disconnect] = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data, error }, connect] = useConnect()
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

  useEffect(() => {
    if (data?.connected) {
      setTimeout(() => onClose(), 1000)
    }
  }, [data?.connected])

  return (
    <>
      {account?.data?.address && isLargerThan600 ? (
        <Tag size="lg" colorScheme="red" borderRadius="full">
          <Avatar src={EthereumLogo} size="xs" name="Ethereum" ml={-1} mr={2} />
          <TagLabel>{network?.data?.chain?.name}</TagLabel>
        </Tag>
      ) : (
        <></>
      )}
      <Button
        fontSize={['xs', 'sm']}
        padding={['5px', '15px']}
        size={['sm', 'lg']}
        fontWeight={600}
        color={'white'}
        bg={'pink.400'}
        href={'#'}
        _hover={{
          bg: 'pink.300',
        }}
        onClick={onOpen}
      >
        {data?.connected ? 'Connected' : 'Connect Wallet'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select your Web3 Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} alignItems={'center'}>
              {data.connectors.map((connector) => (
                <Flex key={connector.id} margin={'5px'}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    disabled={!connector.ready}
                    onClick={() => connect(connector)}
                  >
                    <WalletImage name={connector.name} />

                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                  </Button>
                </Flex>
              ))}

              {error && <div>{error?.message ?? 'Failed to connect'}</div>}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Connect
