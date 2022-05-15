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
  Button,
  useToast,
  Input,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState, useRef } from 'react'

import CLAIM_ABI from '../../abi/claimABI'
import DAO_TOKEN_ABI from '../../abi/dao_token_abi'
import PpCard from 'src/components/PpCard/PpCard'

const ClaimPage = () => {
  const toast = useToast()

  const CLAIM_ADDRESS = process.env.CLAIM_ADDRESS
  const DAO_TOKEN_ADDRESS = process.env.DAO_TOKEN

  // get account
  const [account] = useAccount()
  const [isConnected, connect] = useConnect()
  const [img, setImg] = useState('')
  const [value, setValue] = React.useState('0000')
  // const handleChange = (event) => setValue(event.target.value.pad)

  const handleChange = (event) => {
    const number = event.target.value
    setValue(number.padStart(4, 0).slice(-4))
  }

  console.log('value: ', value)
  // State
  const [txMsg, setTxMsg] = useState('')

  // get the voting power of user
  const [votePower] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'balanceOf',
    { args: account?.data?.address }
  )

  const [owner] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'ownerOf',
    { args: parseInt(img) }
  )

  // mint the user
  const [claimTX, claimWrite] = useContractWrite(
    {
      addressOrName: CLAIM_ADDRESS,
      contractInterface: CLAIM_ABI,
    },
    'claim',
    { args: parseInt(value) }
  )

  const doClaim = async () => {
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

    const res = await claimWrite()
    handleTx(res)
  }

  // useEffect(() => {
  //   toast({
  //     title: `This is ALPHA software`,
  //     description: `Documentation has not been prepared yet. This page allows you to claim a single, non-transferable vote token in the DAO every three months.
  //     This is alpha software and not yet finished (or tested). Please share your feedback in the discord support channel.`,
  //     status: 'info',
  //     duration: 10000,
  //     isClosable: true,
  //   })
  // }, [])

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
        // borderRadius={'5px'}
        // borderColor={'grey'}
        // boxShadow={'5px 5px 15px 5px rgba(0,0,0,0.08)'}
        >
          {!isConnected?.data?.connected ? (
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
              <Stack alignItems={'center'} margin={'20px'}>
                <Text fontSize={['2xl', '4xl']} fontWeight={'extrabold'}>
                  Claim Vote
                </Text>
                <Text>Curious how it works? Read more <Link href='https://pridepunks.notion.site/Pride-Punk-DAO-Instructions-10ac5ae9f4954b4ca369a57dd047e9a0' color={'blue.300'}>here</Link></Text>
              </Stack>
              <PpCard img={value} />
              <Flex flexDirection={'row'} marginTop={'10px'}>
                For which PridePunk # are you claiming a vote?{' '}
              </Flex>
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
              <Flex
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Input
                  value={value}
                  onChange={handleChange}
                  placeholder="1234"
                  size="lg"
                  type={'number'}
                  maxWidth={'100px'}
                  margin={'25px'}
                />

                <Button
                  w={'full'}
                  bg={'green.400'}
                  color={'white'}
                  rounded={'xl'}
                  boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                  onClick={() => doClaim()}
                >
                  Claim
                </Button>
              </Flex>
              <Text fontSize={'xx-small'} margin={'15px'}>
                <Link
                  href="https://pridepunks.notion.site/Disclaimer-TOS-584bc6e440994dc981e589b0f38f6db0"
                  isExternal
                >
                  By claiming you accept the terms of service.
                </Link>
              </Text>
            </Flex>
          )}
        </Container>
      </Flex>
    </>
  )
}

export default ClaimPage
