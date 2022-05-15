import {
  Box,
  Flex,
  Text,
  Spinner,
  Image,
  Center,
  Stack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { MetaTags } from '@redwoodjs/web'
import { useMemo } from 'react'
import abi from 'src/abi/abi'
import { utils } from 'ethers'
import externalABI from './externalABI'

// const MPC_ADDRESS = '0x67401149E3e88B10DD92821EB6302F4DeE8191bC'
// const External_List = '0x5fF7428c7129b18Ae69c05A1c293DF82Dcd035c7'

const MPC_ADDRESS = process.env.MPC_ADDRESS
const External_List = process.env.EXTERNAL_WL

const AllowlistPage = () => {
  const [account] = useAccount()

  const resolvedAccount = useMemo(() => {
    return account?.data?.address
  }, [account])


  const [externalList] = useContractRead(
    {
      addressOrName: External_List,
      contractInterface: externalABI,
    },
    'isOnList',
    { args: resolvedAccount, watch: true }
  )

  // console.log("external List: ", externalList?.data)

  const [{ data: isWhiteListOpen, error: wlError, loading: wlLoading }] =
    useContractRead(
      {
        addressOrName: MPC_ADDRESS,
        contractInterface: abi,
      },
      'isWhiteListOpen'
    )

  const [{ data: whiteListMintFee, error: mfError, loading: mfLoading }] =
    useContractRead(
      {
        addressOrName: MPC_ADDRESS,
        contractInterface: abi,
      },
      'whiteListMintFee'
    )

  const [{ data: whiteListMintLimit, error: wlmlError, loading: wlmlLoading }] =
    useContractRead(
      {
        addressOrName: MPC_ADDRESS,
        contractInterface: abi,
      },
      'whiteListMintLimit'
    )

  const [
    { data: onWhiteList, error: onWhiteListError, loading: onWhiteListLoading },
  ] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteList',
    { args: resolvedAccount, watch: true }
  )

  const [{ data: writeData, error: writeError, loading: writeLoading }, write] =
    useContractWrite(
      {
        addressOrName: MPC_ADDRESS,
        contractInterface: abi,
      },
      'addToWhitelist'
    )

  const getWlMintLimit = () => {
    if (whiteListMintLimit) return whiteListMintLimit.toString()
    if (writeLoading) return 'loading'
    if (wlmlError) return 'error'
    return 'undefined'
  }
  const getWlMintFee = () => {
    if (whiteListMintFee) return utils.formatEther(whiteListMintFee)
    if (mfLoading || undefined) return 'loading'
    if (mfError) return 'error fetching'
    return 'undefined'
  }

  const getWLStatus = () => {
    if (onWhiteList || externalList?.data)
      return (
        <Badge colorScheme="green">Your address is on the Rainbow List</Badge>
      )
    if (onWhiteListLoading || externalList?.loading)
      return <Badge colorScheme="gray">loading...</Badge>
    if (onWhiteListError || externalList?.loading)
      return <Badge colorScheme="gray">error loading...</Badge>

    return (
      <Badge colorScheme="red">Your address is not on the Rainbow List</Badge>
    )
  }

  const getButtonType = () => {
    if (wlLoading) {
      return <Spinner />
    }

    if (isWhiteListOpen) {
      return (
        <Text
          fontSize={'2xl'}
          fontWeight={'bold'}
          margin={'.5em'}
          bgColor={'green.300'}
          padding={'.2em'}
          borderRadius={'20px'}
          textAlign={'center'}
          color={'white'}
        >
          Open
        </Text>
      )
    }

    return (
      <Text
        fontSize={'2xl'}
        fontWeight={'bold'}
        margin={'.5em'}
        bgColor={'red.300'}
        padding={'.2em'}
        borderRadius={'20px'}
        textAlign={'center'}
        color={'white'}
      >
        NOT OPEN YET
      </Text>
    )
  }
  return (
    <>
      <MetaTags title="Allowlist" description="Allowlist page" />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        minHeight={'92vh'}
        flexDirection={'column'}
        marginTop={'50px'}
      >
        {/* <Text fontSize={'8xl'} fontWeight={'bold'} margin={'.5em'}>
          ALLOWLIST: {getButtonType(null)}
        </Text> */}
        <Center py={6}>
          <Box
            minWidth={'430px'}
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
              <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text
                  fontSize={'6xl'}
                  fontWeight={800}
                  bgGradient={`linear-gradient(
              90deg,
              rgba(255, 0, 0, 1) 0%,
              rgba(255, 154, 0, 1) 10%,
              rgba(208, 222, 33, 1) 20%,
              rgba(79, 220, 74, 1) 30%,
              rgba(63, 218, 216, 1) 40%,
              rgba(47, 201, 226, 1) 50%,
              rgba(28, 127, 238, 1) 60%,
              rgba(95, 21, 242, 1) 70%,
              rgba(186, 12, 248, 1) 80%,
              rgba(251, 7, 217, 1) 90%,
              rgba(255, 0, 0, 1) 100%
          )`}
                  bgClip={'text'}
                >
                  RAINBOW LIST
                </Text>
              </Stack>
              <Text fontSize={'xl'}>The Rainbow List is now Closed.</Text>
              <Text
                fontSize={'3xl'}
                fontWeight={800}
                bgGradient={`linear-gradient(
              90deg,
              rgba(255, 0, 0, 1) 0%,
              rgba(255, 154, 0, 1) 10%,
              rgba(208, 222, 33, 1) 20%,
              rgba(79, 220, 74, 1) 30%,
              rgba(63, 218, 216, 1) 40%,
              rgba(47, 201, 226, 1) 50%,
              rgba(28, 127, 238, 1) 60%,
              rgba(95, 21, 242, 1) 70%,
              rgba(186, 12, 248, 1) 80%,
              rgba(251, 7, 217, 1) 90%,
              rgba(255, 0, 0, 1) 100%
          )`}
                bgClip={'text'}
              >
                GOOD LUCK FAM
              </Text>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Open to NFT Historians for a limited time
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Mint up to {getWlMintLimit()} PridePunks (one time only)
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Mint for {getWlMintFee()} ETH when mint opens
                </ListItem>
              </List>
              <Flex
                alignItems={'center'}
                marginTop={'2em'}
                flexDirection={'column'}
              >
                <Text fontWeight={'light'}>{getWLStatus()}</Text>
                <Text fontWeight={'bold'} fontSize={'xl'}>
                  {account?.data ? account?.data?.address : 'Connect Wallet'}
                </Text>
              </Flex>
              {/* <Button
                mt={10}
                w={'full'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
                isDisabled={!isWhiteListOpen ? true : false}
                onClick={() => write()}
              >
                {isWhiteListOpen ? 'Add my address to the list' : 'List Closed'}
              </Button> */}
            </Box>
          </Box>
        </Center>

        <Image
          boxSize="100px"
          marginTop={'1em'}
          src="https://pridepunk.s3.amazonaws.com/336pxPridePunk/7002.png"
        />
      </Flex>
    </>
  )
}

export default AllowlistPage
