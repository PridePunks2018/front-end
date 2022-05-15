import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  useColorModeValue,
  Flex,
  Badge,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  useAccount,
  useContractRead,
  useConnect,
  useSignTypedData,
  useEnsAvatar,
  useContractWrite,
  useNetwork,
  useEnsLookup,
  useSigner,
  useProvider,
} from 'wagmi'

import { useEffect, useState } from 'react'

import CLAIM_ABI from '../../abi/claimABI'
import DAO_TOKEN_ABI from '../../abi/dao_token_abi'
import DAO_ABI from 'src/abi/daoABI'
import DelegateCardStories from './DelegateCard.stories'
import { ethers } from 'ethers'

const CLAIM_ADDRESS = process.env.CLAIM_ADDRESS
const DAO_TOKEN_ADDRESS = process.env.DAO_TOKEN
const DAO_ADDRESS = process.env.DAO_ADDRESS

// domain
const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]

// delegation type
const Delegation = [
  { name: 'delegatee', type: 'address' },
  { name: 'nonce', type: 'uint256' },
  { name: 'expiry', type: 'uint256' },
]

export default function DelegateCard({ response, showAll }) {
  const address =
    response[
      "Thanks for that, {{field:fc9c50c4c58e0e72}}. What's your *Ethereum Address*?"
    ]

  const discord =
    response[
      "What's your COMPLETE *Discord Handle*? (Include the numbers after the #)"
    ]

  const reasoning = response['Why do you want to be a delegate?']

  const provider = useProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [readMore, setReadMore] = useState(false)

  const [signer, getSigner] = useSigner()
  // get the voting power of user
  const [votePower] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'getVotes',
    {
      args: address,
    }
  )

  const [tokenBalance] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'balanceOf',
    {
      args: address,
    }
  )

  // get ens avatar
  const [avatar, getEnsAvatar] = useEnsAvatar({
    addressOrName: address,
  })

  if (avatar?.data) console.log('Avatar: ', avatar)

  // get ens name
  const [ens, lookupAddress] = useEnsLookup({
    address,
  })

  // get Nonce
  const [nonce] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'nonces',
    { args: address }
  )

  // sign message
  const version = '1'
  const chainId = 1
  const verifyingContract = DAO_TOKEN_ADDRESS

  const expiry = 10e9

  const domainData = {
    name: 'Pride Punk DAO',
    version,
    chainId,
    verifyingContract,
  }

  const message = {
    delegatee: address,
    nonce: nonce?.data,
    expiry,
  }

  const [signedMsg, signTypedData] = useSignTypedData({
    domain: domainData,
    types: { Delegation },
    value: message,
  })

  const [sig, setSignature] = useState({ v: 0, r: '', s: '' })

  const [transaction, write] = useContractWrite(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'delegateBySig',
    { args: [address, nonce?.data, expiry, sig.v, sig.r, sig.s] }
  )

  const [delegateTransaction, delegateWrite] = useContractWrite(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'delegate',
    { args: [address] }
  )
  const delegate = async () => {
    // const res = await signTypedData()
    // console.log('Delegated!', res)

    // const signature = res?.data.substring(2)
    // const r = '0x' + signature.substring(0, 64)
    // const s = '0x' + signature.substring(64, 128)
    // const v = parseInt(signature.substring(128, 130), 16)

    // // setSignature({ v, r, s })

    // console.log([address, nonce?.data, expiry, v, r, s])
    // write({ args: [address, nonce?.data, expiry, v, r, s] })
    delegateWrite({ args: [address] })
  }

  // useEffect(() => {
  //   if (!transaction?.data && sig.v != 0 && sig.r && sig.s) {
  //     write({ args: [address, nonce, expiry, sig.v, sig.r, sig.s] })
  //   }
  // }, [sig, address, nonce, write])

  if (!reasoning || !address || !ethers.utils.isAddress(address)) {
    return <></>
  }

  if (!showAll && tokenBalance?.data?.toString() == '0') return <></>

  return (
    <Center py={6} margin={'20px'}>
      <Flex
        flexDirection={'column'}
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        minHeight={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Avatar
          size={'xl'}
          src={`https://api.tiles.art/png/${address}`}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {ens?.data ? (
            <>
              {' '}
              <Badge colorScheme="blue">ENS</Badge> {ens?.data}
            </>
          ) : (
            <>
              <Badge colorScheme="green">Discord</Badge> {discord}
            </>
          )}
        </Heading>
        <Text fontWeight={600} fontSize={'xx-small'} color={'gray.500'} mb={4}>
          <Link href={`https://etherscan.io/address/${address}`} isExternal>
            {address}
          </Link>
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
          noOfLines={!readMore ? 3 : 100}
        >
          {reasoning}
        </Text>

        <Stack
          align={'center'}
          justify={'center'}
          direction={'row'}
          mt={6}
          border="2px"
          borderWidth={'1px'}
          borderRadius={'10px'}
          padding={'1em'}
          borderColor={'ghostwhite'}
        >
          <Text
            fontWeight={'bold'}
            fontSize={'xl'}
            color={votePower?.data?.toString() == '0' ? 'gray.400' : ''}
            bgGradient={
              votePower?.data?.toString() != '0'
                ? 'linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)"'
                : 'linear-gradient(90deg, rgba(193,193,193,1) 0%, rgba(210,210,210,1) 52%, rgba(210,209,209,1) 100%);'
            }
            bgClip="text"
          >
            Voting Power:{' '}
          </Text>
          <Badge
            px={2}
            py={1}
            // bg={useColorModeValue('gray.50', 'gray.800')}
            bg={'white'}
            fontWeight={'400'}
            fontSize={'2xl'}
            color={votePower?.data?.toString() == '0' ? 'gray.200' : 'gray.900'}
          >
            {votePower?.error || votePower?.loading ? (
              address ? (
                <Spinner />
              ) : (
                'Invalid'
              )
            ) : (
              votePower?.data?.toString()
            )}
          </Badge>
        </Stack>
        <Text fontSize={'xx-small'}>
          Token Balance:{' '}
          {tokenBalance?.loading ? (
            <Spinner size={'xs'} />
          ) : (
            tokenBalance?.data?.toString()
          )}
        </Text>
        <Link href={`https://opensea.io/${address}`} fontSize={'xs'} isExternal>
          View OpenSea Collection
        </Link>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
            onClick={onOpen}
          >
            Read More
          </Button>

          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={() => delegate()}
          >
            Delegate
          </Button>
        </Stack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ens?.data ? ens.data : discord}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{reasoning}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={() => delegate()}
              variant="ghost"
            >
              Delegate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}
