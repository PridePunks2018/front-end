import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {
  useAccount,
  useContractRead,
  useConnect,
  useContractWrite,
} from 'wagmi'

import abi from 'src/abi/abi'
import externalListAbi from 'src/abi/externalListAbi'

import {
  Container,
  Flex,
  Spacer,
  Text,
  Box,
  Stack,
  Link,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  NumberDecrementStepper,
  NumberInput,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  InputGroup,
  useToast,
  Image,
  Radio,
  LinkBox,
  RadioGroup,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState, useRef } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current()
    }, delay)
    return () => clearInterval(id)
  }, [delay])
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const MintPage = () => {
  const toast = useToast()
  // const MPC_ADDRESS = '0x67401149E3e88B10DD92821EB6302F4DeE8191bC' // real
  // const EXTERNAL_LIST_ADDRESS = '0x5fF7428c7129b18Ae69c05A1c293DF82Dcd035c7'
  // const MPC_ADDRESS = "0x21F4Ed0Ebab2c80425215B2a53c0301298c84e07" // rinke

  const MPC_ADDRESS = process.env.MPC_ADDRESS
  const EXTERNAL_LIST_ADDRESS = process.env.EXTERNAL_WL

  // get account
  const [account] = useAccount()
  const [isConnected, connect] = useConnect()

  // Mint types
  const PUBLIC = 'PUBLIC'
  const RAINBOW = 'RAINBOW'
  const BOOTSTRAP = 'BOOTSTRAP'
  const EXTERNAL_LIST = 'EXTERNAL LIST'

  // State
  const [value, setValue] = useState(1) // number of mints
  const [isLoading, setLoading] = useState(true) // if the site is loading
  const [mintType, setMintType] = useState('PUBLIC') // the kind of mint page to display
  const [calculatedMintPrice, setMintPrice] = useState('0') // the calculated cost of each NFT to mint
  const [punkNumber, setPunkNumber] = useState(5000)
  const [txMsg, setTxMsg] = useState('')

  // interval
  const interval = process.env.NODE_ENV == 'development' ? 10000 : 3000
  // animate the images
  useInterval(() => {
    setPunkNumber(getRandomInt(10000, 9800))
  }, interval)

  // mint functions
  const [publicMintTX, publicMintWrite] = useContractWrite(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'mint'
  )
  const [rainbowMintTX, rainbowMintWrite] = useContractWrite(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteListMint'
  )
  const [bootstrapMintTX, bootstrapMintWrite] = useContractWrite(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'teamMint'
  )

  const [externalListMint, externalListMintWrite] = useContractWrite(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'externalWhiteListMint'
  )

  // check if they are white list
  const [isWhiteList] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteList',
    { args: account?.data?.address }
  )

  // check if they are teammint (bootstrap)
  const [isBootStrap] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'bootstrapList',
    { args: account?.data?.address }
  )

  // get price of normal mint
  const [mintPrice] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'mintFee'
  )
  // get price of white list
  const [whiteListPrice] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteListMintFee'
  )

  // Remianing WhiteList
  const [whiteListMintLimit] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteListMintLimit'
  )

  // get the total avalible for white list minting
  const [whiteListTotalMintLimit] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'whiteListTotalMintLimit'
  )

  // Current Token ID
  const [tokenId] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'tokenId'
  )

  // get total tokens availbile
  const [publicMintLimit] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'publicMintLimit'
  )

  // check if external whitelist is enabled
  const [externalListEnabled] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'externalListIsEnabled'
  )

  // check if users is on external whitelist
  const [isExternalList] = useContractRead(
    {
      addressOrName: EXTERNAL_LIST_ADDRESS,
      contractInterface: externalListAbi,
    },
    'list',
    { args: account?.data?.address }
  )

  // set mint type
  useEffect(() => {
    if (
      !isWhiteList?.loading &&
      !isBootStrap?.loading &&
      !account.loading &&
      isConnected?.data?.connected
    ) {
      if (parseInt(isBootStrap?.data?.toString()) > 0) {
        // console.log('team mint')
        setMintType(BOOTSTRAP)
      }

      if (parseInt(isBootStrap?.data?.toString()) == 0 && isWhiteList?.data) {
        // console.log('whiteList')
        setMintType(RAINBOW)
      }

      if (
        parseInt(isBootStrap?.data?.toString()) == 0 &&
        !isWhiteList?.data &&
        isExternalList?.data
      ) {
        // console.log('External List')
        setMintType(EXTERNAL_LIST)
      }

      if (
        parseInt(isBootStrap?.data?.toString()) == 0 &&
        !isWhiteList?.data &&
        !isExternalList?.data
      ) {
        // console.log('public mint')
        setMintType(PUBLIC)
      }
      setLoading(false)
    }
  }, [isBootStrap?.loading, isWhiteList?.loading, account?.loading])

  // set the mint price
  useEffect(() => {
    // if it's not loading, and we have a mintType and a price
    if (!isLoading) {
      if (mintType == BOOTSTRAP) {
        setMintPrice('0')
        return
      }

      if (
        (mintType == RAINBOW && whiteListPrice?.data) ||
        (mintType == EXTERNAL_LIST && whiteListPrice?.data)
      ) {
        setMintPrice(whiteListPrice.data.toString())
        return
      }

      if (mintType == PUBLIC && mintPrice?.data) {
        setMintPrice(mintPrice?.data.toString())
        return
      }
    }
  }, [
    mintType,
    whiteListPrice?.data,
    mintPrice?.data,
    isLoading,
    calculatedMintPrice,
  ])

  const doMint = async () => {
    // calculate the final price

    const finalPrice = ethers.BigNumber.from(value).mul(
      ethers.utils.parseUnits(calculatedMintPrice, 'wei')
    )

    console.log('NFTS Requested: ', value)
    console.log(`Cost Per NFT for ${mintType} mint: `, calculatedMintPrice)
    console.log('Final price', finalPrice.toString())

    const mintSettings = {
      args: value,
      overrides: {
        value: finalPrice,
      },
    }

    const handleTx = (res) => {
      console.log('Response from TX: ', res)
      if (res?.error?.error) {
        toast({
          title: `${res.error.name}`,
          description: `${res.error.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }

      // for testing
      if (res?.error?.data) {
        toast({
          title: `${res.error.code}`,
          description: `${res.error.data.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      if (res?.data?.hash) {
        setTxMsg(res.data.hash)
      }
    }

    if (mintType == BOOTSTRAP) {
      // console.log('...minting as Team')
      const res = await bootstrapMintWrite(mintSettings)
      handleTx(res)
      return
    }

    if (mintType == RAINBOW) {
      // console.log('...minting as Rainbowlist')
      const res = await rainbowMintWrite(mintSettings)
      handleTx(res)
      return
    }

    if (mintType == PUBLIC) {
      // console.log('...minting as public mint')
      const res = await publicMintWrite(mintSettings)
      handleTx(res)
      return
    }

    if (mintType == EXTERNAL_LIST) {
      // console.log('...minting on external list')
      const res = await externalListMintWrite(mintSettings)
      handleTx(res)
    }
  }

  const getMintType = () => {
    // return early if no mint type
    if (
      isWhiteList?.loading ||
      isBootStrap?.loading ||
      account.loading ||
      !isConnected?.data?.connected
    ) {
      return
    }

    // console.log('Mint type: ', mintType)

    if (mintType == BOOTSTRAP) {
      return (
        <Flex justifyContent={'space-between'} minWidth={'100%'}>
          <Box p="4">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              On the Team List:{' '}
            </Text>
            {Number(isBootStrap?.data?.toString()) > 0 ? 'Yes' : 'No'}
            <Text fontSize={'xx-small'}>
              You may mint up to{' '}
              <Text as={'span'}>{isBootStrap?.data?.toString()}</Text>{' '}
              PridePunks as a team member. <br />
            </Text>
            <Text
              fontSize={'xx-small'}
              _hover={{ color: 'blue' }}
              onClick={() => setMintType(PUBLIC)}
              color="grey"
            >
              Switch to Public mint.
            </Text>
          </Box>
          <Spacer />
          <Box p="4">
            <Stat align={'right'}>
              <StatLabel>Allocation Remaining</StatLabel>
              <StatNumber>
                {isBootStrap?.data &&
                ethers.BigNumber.isBigNumber(isBootStrap?.data)
                  ? isBootStrap?.data?.toString()
                  : 'loading...'}
              </StatNumber>
              <StatHelpText>
                <Text fontSize={'xx-small'}>no fee (only gas)</Text>
              </StatHelpText>
            </Stat>
          </Box>
        </Flex>
      )
    }

    if (mintType == RAINBOW) {
      return (
        <Flex justifyContent={'space-between'} minWidth={'100%'}>
          <Box p="4">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              On the Rainbow List: {isWhiteList?.data ? 'Yes' : 'No'}
            </Text>
            <Text fontSize={'xx-small'}>
              You may mint up to{' '}
              <Text as={'span'}>
                {isWhiteList?.data ? whiteListMintLimit?.data?.toString() : '0'}
              </Text>{' '}
              PridePunks one time only on the Rainbow List. <br />
              After, you may mint as many as you want in the public mint.
            </Text>
            <Text
              fontSize={'xx-small'}
              _hover={{ color: 'blue' }}
              onClick={() => setMintType(PUBLIC)}
              color="grey"
            >
              Switch to Public mint.
            </Text>
          </Box>
          <Spacer />
          <Box p="4">
            <Stat align={'right'}>
              <StatLabel>Mint Price</StatLabel>
              <StatNumber>
                {whiteListPrice?.data &&
                ethers.BigNumber.isBigNumber(whiteListPrice?.data)
                  ? `${ethers.utils.formatEther(whiteListPrice?.data)} ETH`
                  : 'loading...'}
              </StatNumber>
              <StatHelpText>
                {/* <Text fontSize={'xx-small'}>
                  Remaining White List Minters:{' '}
                  {whiteListTotalMintLimit?.data
                    ? whiteListTotalMintLimit?.data?.toString()
                    : 'loading...'}
                </Text> */}
              </StatHelpText>
            </Stat>
          </Box>
        </Flex>
      )
    }

    if (mintType == EXTERNAL_LIST) {
      return (
        <Flex justifyContent={'space-between'} minWidth={'100%'}>
          <Box p="4">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Rainbow Giveaway list
            </Text>
            <Text fontSize={'xx-small'}>
              You may mint up to{' '}
              <Text as={'span'}>
                {isWhiteList?.data || isExternalList?.data
                  ? whiteListMintLimit?.data?.toString()
                  : '0'}
              </Text>{' '}
              PridePunks one time only on the Rainbow Giveaway List. <br />
              After, you may mint as many as you want in the public mint.
            </Text>
            <Text
              fontSize={'xx-small'}
              _hover={{ color: 'blue' }}
              onClick={() => setMintType(EXTERNAL_LIST)}
              color="grey"
            >
              Switch to Public mint.
            </Text>
          </Box>
          <Spacer />
          <Box p="4">
            <Stat align={'right'}>
              <StatLabel>Mint Price</StatLabel>
              <StatNumber>
                {whiteListPrice?.data &&
                ethers.BigNumber.isBigNumber(whiteListPrice?.data)
                  ? `${ethers.utils.formatEther(whiteListPrice?.data)} ETH`
                  : 'loading...'}
              </StatNumber>
              <StatHelpText>
                <Text fontSize={'xx-small'}>
                  Remaining:{' '}
                  {whiteListTotalMintLimit?.data
                    ? whiteListTotalMintLimit?.data?.toString()
                    : 'loading...'}
                </Text>
              </StatHelpText>
            </Stat>
          </Box>
        </Flex>
      )
    }

    return (
      <Flex justifyContent={'space-between'} minWidth={'100%'}>
        <Box p="4">
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Public Mint:
          </Text>
          <Text fontSize={'xx-small'}>
            You may mint as many PridePunks as you wish in the public mint.
            <br />
          </Text>
        </Box>
        <Spacer />
        <Box p="4">
          <Stat align={'right'}>
            <StatLabel>Mint Price</StatLabel>
            <StatNumber>
              {mintPrice?.data
                ? `${
                    ethers.utils.formatEther(mintPrice?.data) == '1000000.0'
                      ? 'Not Open'
                      : ethers.utils.formatEther(mintPrice?.data)
                  } ETH`
                : 'loading...'}
            </StatNumber>
            <StatHelpText>
              <Text fontSize={'xx-small'}>
                {tokenId?.data ? tokenId?.data?.toString() : 'loading...'} /{' '}
                {publicMintLimit?.data
                  ? publicMintLimit?.data?.toString()
                  : 'loading...'}
              </Text>
            </StatHelpText>
          </Stat>
        </Box>
      </Flex>
    )
  }

  return (
    <>
      <MetaTags title="Mint" description="Mint" />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        minHeight={'80vh'}
        flexDirection={'column'}
        marginTop={'50px'}
      >
        <Container
          // border={'1px'}
          borderRadius={'5px'}
          borderColor={'grey'}
          boxShadow={'5px 5px 15px 5px rgba(0,0,0,0.08)'}
        >
          {isLoading || !isConnected?.data?.connected ? (
            <Flex
              flexDirection={'column'}
              width={'100%'}
              minHeight={'30vh'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text>Please be sure your wallet is connected.</Text>
            </Flex>
          ) : (
            <Flex flexDirection={'column'} width={'100%'} alignItems={'center'}>
              <Flex maxWidth={'100%'} marginTop={'25px'}>
                {[...Array(4).keys()].map((el, index) => (
                  <Image
                    key={index}
                    src={`https://pridepunk.s3.amazonaws.com/336pxPridePunk/${
                      punkNumber + index
                    }.png`}
                    maxWidth={['50px', '80px']}
                    margin={['2px', '4px']}
                  />
                ))}
              </Flex>
              <Spacer />
              <Stack alignItems={'center'} margin={'1em'}>
                <Text fontSize={['2xl', '4xl']} fontWeight={'extrabold'}>
PUBLIC MINT SOLD OUT
                </Text>
              </Stack>

              {getMintType()}
              <Flex flexDirection={'row'}></Flex>
              <Box marginTop={'1.5em'}>
                <InputGroup>
                  <NumberInput
                    defaultValue={value}
                    min={1}
                    max={2000}
                    keepWithinRange={true}
                    size="lg"
                    onChange={(valueString) => {
                      parseInt(valueString)
                        ? setValue(Math.ceil(parseInt(valueString)))
                        : setValue(1)
                    }}
                    value={value}
                    // isInvalid
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </Box>
              {txMsg ? (
                <Text
                  fontSize={'x-small'}
                  _hover={{ color: 'blue' }}
                  marginTop={'10px'}
                >
                  <Link href={`https://etherscan.io/tx/${txMsg}`} isExternal>
                    {' '}
                    🌈 Check Tx on Etherscan 🌈
                  </Link>
                </Text>
              ) : (
                ''
              )}
              <Button
                mt={10}
                w={'full'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: `linear-gradient(
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
              )`,
                  fontcolor: 'white',
                  fontSize: '4xl',
                  fontStyle: 'bold',
                  transition: '0.3s',
                }}
                _focus={{
                  bg: 'green.500',
                }}
                onClick={() => doMint()}
              >
                Mint
              </Button>
              <Text fontSize={'xx-small'} margin={'15px'}>
                <Link
                  href="https://pridepunks.notion.site/Disclaimer-TOS-584bc6e440994dc981e589b0f38f6db0"
                  isExternal
                >
                  By minting you accept the terms of the disclaimer above.
                </Link>
              </Text>
            </Flex>
          )}
        </Container>
      </Flex>
    </>
  )
}

export default MintPage
