import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import {
  useAccount,
  useContractRead,
  useConnect,
  useContractWrite,
} from 'wagmi'

import abi from 'src/abi/abi'
import externalListAbi from 'src/abi/externalListAbi'

const AdminPage = () => {
  const MPC_ADDRESS = '0x67401149E3e88B10DD92821EB6302F4DeE8191bC' // real

  // contract pause state
  // check if they are white list
  const [isPaused] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'paused'
  )

  console.log('isPaused', isPaused)

  // whitelist state
  const [isWhiteListOpen] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'isWhiteListOpen'
  )

  console.log('isWhiteListOpen', isWhiteListOpen)
  // whitelist mint state
  const [isWhiteListMintOpen] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'isWhiteListMintOpen'
  )

  // external whitelist state

  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <Flex
        minWidth={'100vw'}
        minHeight={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        Hello Admin
        <Box>
          <Button
            color="white"
            bgColor={isPaused?.data ? 'red.400' : 'green.400'}
            _hover={{
              bgColor: isPaused?.data ? 'green.400' : 'red.400',
            }}
            transition={'ease-in-out'}
          >
            {isPaused?.data ? 'Paused: Click to enable' : 'Unpaused: click to Pause'}
          </Button>
        </Box>
        <Box>
          <Button
            color="white"
            bgColor={!isWhiteListOpen?.data ? 'red.400' : 'green.400'}
            _hover={{
              bgColor: !  isWhiteListOpen?.data ? 'green.400' : 'red.400',
            }}
            transition={'ease-in-out'}
          >
            {!isWhiteListOpen?.data ? 'WhiteList Closed: Click to enable' : 'WhiteListOpen: click to Close'}
          </Button>
        </Box>
        <Text>Open Close Whitelist</Text>
      </Flex>
    </>
  )
}

export default AdminPage
