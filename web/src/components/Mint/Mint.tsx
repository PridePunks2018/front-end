import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Spinner,
  toast,
  Link,
  NumberDecrementStepper,
  NumberInput,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
// import abi from '../../abi/MetaPunkController2018.json'
import abi from '../../abi/abi'
import { MetaPunkController2022Interface } from '../../abi/types/MetaPunkController2022'
import { useEffect, useState } from 'react'
import MintInputBox from '../MintInputBox/MintInputBox'

// const contractAddress = '0xEEecF036F54fc3e8A9e0059e4D64faD0dAda2Dd1'
const contractAddress = '0x8Cf3525292756b671fc923eb07aeCa43C6fd625F' //rinkeby

export default function Mint() {
  const toast = useToast()
  // mint ETH value
  const [value, setValue] = useState(1)
  // Spinner State
  const [minting, isMinting] = useState(false)
  // Transaction status
  const [tx, setTx] = useState(null)

  const [transaction, write] = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
    },
    'mint'
  )

  const [status, wait] = useWaitForTransaction({
    wait: transaction.data?.wait,
  })


  // track the status of a tx
  useEffect(() => {
    if (status?.error) {
      isMinting(false)
      toast({
        title: status?.error?.name,
        description: status?.error?.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    if (status?.data && !status?.error) {
      // set minting as finished
      isMinting(false)

      // do a toast popup
      toast({
        title: 'Minting Success',
        description: `Your transaction hash: ${status.data.transactionHash}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [status?.data])

  // if here is an error pop it up
  useEffect(() => {
    if (transaction?.error) {
      isMinting(false)
      toast({
        title: transaction?.error?.name,
        description: transaction?.error?.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [transaction?.error])

  // set the tx hash to follow it
  useEffect(() => {
    if (transaction?.data?.hash) {
      setTx(transaction.data.hash)
    }
  }, [transaction?.data])

  const doMint = () => {
    isMinting(true)

    write({
      args: value,
      overrides: {
        value: ethers.BigNumber.from(value).mul(
          ethers.utils.parseUnits('0.09', 'ether')
        ),
      },
    })
  }

  return (
    <Center py={6} zIndex={'10'}>
      <Box
        maxW={'350px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('red.50', 'red.900')}
            p={2}
            px={3}
            color={'red.500'}
            rounded={'full'}
            padding={'-2em'}
          >
            Mint PAUSED!
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
             TBD
            </Text>
            <Text fontSize={'5xl'} color={'gray.500'}>
              ETH
            </Text>
          </Stack>
          <Text fontSize={'xs'}>(Per Pride Punk)</Text>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              The{' '}
              <Text as={'span'} fontWeight={600} color={'red.500'}>
                FIRST
              </Text>{' '}
              Punk Derivative
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Created June 23, 2018{' '}
              <Link
                color={'blue.300'}
                href="https://etherscan.io/address/0x0144B7e66993C6BfaB85581e8601f96BFE50c9Df"
                isExternal
              >
                (proof)
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              Announced in LarvaLabs{' '}
              <Link
                color={'blue.300'}
                href="https://discord.com/channels/329381334701178885/329381334701178885/460157631437340693"
                isExternal
              >
                Discord
              </Link>
            </ListItem>
          </List>
          {minting ? (
            <>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                margin={'2em'}
              />
              <Text>Minting...</Text>
            </>
          ) : (
            <MintInputBox value={value} setValue={setValue} doMint={doMint} />
          )}
        </Box>
      </Box>
    </Center>
  )
}
