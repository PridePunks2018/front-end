import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from '@chakra-ui/react'
import { useAccount, useContractRead } from 'wagmi'
import DAO_TOKEN_ABI from '../../abi/dao_token_abi'

const IMAGE = 'https://pridepunk.s3.amazonaws.com/336pxPridePunk/'
const DAO_TOKEN_ADDRESS = '0x0144B7e66993C6BfaB85581e8601f96BFE50c9Df'
const CLAIM_ADDRESS = process.env.CLAIM_ADDRESS
import CLAIM_ABI from '../../abi/claimABI'

export default function PpCard({ img }) {
  const [account] = useAccount()
  console.log('Img: ', img)
  const [owner] = useContractRead(
    {
      addressOrName: DAO_TOKEN_ADDRESS,
      contractInterface: DAO_TOKEN_ABI,
    },
    'ownerOf',
    { args: parseInt(img) }
  )

  const [lastClaimed] = useContractRead(
    {
      addressOrName: CLAIM_ADDRESS,
      contractInterface: CLAIM_ABI,
    },
    'tokenLastClaimDate',
    { args: parseInt(img) }
  )

  console.log('Last claim Date: ', lastClaimed?.data?.toString())

  const date = new Date(lastClaimed * 1000)
  // Hours part from the timestamp
  const hours = date.getHours()
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes()
  // Seconds part from the timestamp
  const seconds = '0' + date.getSeconds()

  console.log('date: ', date)
  return (
    <Center py={1}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          padding={'15px'}
          // _after={{
          //   transition: 'all .3s ease',
          //   content: '""',
          //   w: 'full',
          //   h: 'full',
          //   pos: 'absolute',
          //   top: 5,
          //   left: 0,
          //   backgroundImage: `url(${IMAGE.concat(img).concat('.png')})`,
          //   filter: 'blur(105px)',
          //   zIndex: -1,
          // }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Link
            href={`https://opensea.io/assets/0x0144b7e66993c6bfab85581e8601f96bfe50c9df/${img}`}
            isExternal
          >
            <Image
              rounded={'lg'}
              height={230}
              width={230}
              objectFit={'cover'}
              src={IMAGE.concat(img).concat('.png')}
            />
          </Link>
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            PridePunk
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            #{img}
          </Heading>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              Owned By:
            </Text>
            <Text fontSize={'x-small'} color={'gray.600'}>
              <Link
                href={`https://etherscan.io/address/${owner?.data}`}
                isExternal
              >
                {owner?.data}
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
