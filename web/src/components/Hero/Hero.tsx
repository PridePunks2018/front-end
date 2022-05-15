import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Icon,
  useColorModeValue,
  useMediaQuery,
  createIcon,
  Link,
  List,
  ListItem,
  ListIcon,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useContractRead } from 'wagmi'
import { navigate, routes } from '@redwoodjs/router'
import abi from 'src/abi/abi'
import useWindowDimensions from 'src/utils/useWindowDimentions'

import { useEffect, useRef, useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
const baseImageURL = 'https://pridepunk.s3.amazonaws.com/336pxPridePunk/'

export default function Hero() {
  // const MPC_ADDRESS = '0x67401149E3e88B10DD92821EB6302F4DeE8191bC' // real
  const MPC_ADDRESS = process.env.MPC_ADDRESS

  const { height, width } = useWindowDimensions()

  const [isDesktop] = useMediaQuery('(min-width: 767px)')
  const [paused] = useContractRead(
    {
      addressOrName: MPC_ADDRESS,
      contractInterface: abi,
    },
    'paused'
  )

  console.log('Is Minting Paused: ', paused?.data)
  const [punkImages, setPunkImages] = useState([])
  useEffect(() => {
    setPunkImages(
      Array.from(
        { length: 4 },
        () =>
          `${baseImageURL}${getRandomInt(1, 9999)
            .toString()
            .padStart(4, `0`)}.png`
      )
    )
  }, [])

  // layout the images

  return (
    <>
      <Container maxW={'6xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Flex
            flexDirection={isDesktop ? 'row' : 'column'}
            justifyContent={'space-around'}
            alignItems={'center'}
          >
            <Flex
              flexDirection={'column'}
              maxWidth={'70%'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={isDesktop ? '110%' : '200%'}
              >
                <Text
                  fontSize={['sm', '5xl']}
                  fontWeight={'900'}
                  color={'black'}
                >
                  THE FIRST CRYPTOPUNK DERIVATIVE
                </Text>
                <Text
                  fontWeight={900}
                  fontSize={['7xl', '9xl']}
                  as={'span'}
                  zIndex={'10'}
                  bgGradient="linear-gradient(
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
    )"
                  bgClip="text"
                >
                  Pride Punks
                </Text>
              </Heading>
              <Image src={punkImages[0]} maxWidth={'100px'} />
              <Text
                fontSize={['md', '3xl']}
                fontWeight={'600'}
                margin={'.3em'}
                backdropFilter={'blur(5px)'}
              >
                Created with 🌈 in{' '}
                <Link
                  color="teal.500"
                  isExternal
                  href="https://etherscan.io/tx/0xe4ab77173af8c01bf89f0fc0f92fb5a4c3f8eebdf31216d9db5d45d74f679217"
                >
                  2018
                </Link>
                .
              </Text>
              <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                marginTop={'1em'}
                marginBottom={'2em'}
              >
                <Text fontSize={['md', 'lg']}>
                  <List spacing={1}>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="green.400" />
                      The{' '}
                      <Text as={'span'} fontWeight={600} color={'red.500'}>
                        FIRST
                      </Text>{' '}
                      CryptoPunk Derivative
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
                </Text>
              </Flex>
              <Box>
                <Link
                  href="https://opensea.io/collection/pridepunks2018"
                  isExternal
                >
                  <Button
                    marginBottom={'30px'}
                    bgColor={'blue.400'}
                    color={'white'}
                    size={'lg'}
                    marginRight={'0.5em'}
                  >
                    Buy on OpenSea
                  </Button>
                </Link>

                <Link
                  href="https://discord.com/invite/pridepunks2018"
                  isExternal
                >
                  <Button
                    marginBottom={'30px'}
                    bgColor={'blue.400'}
                    color={'white'}
                    size={'lg'}
                    marginLeft={'0.5em'}
                  >
                    Join the Discord
                  </Button>
                </Link>
              </Box>

              <Box marginTop={'2em'}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Cd0GfqVPacc"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <Text fontSize={'lg'} fontWeight={'medium'} margin="5px">
                  Watch the video interview with{' '}
                  <Link href="https://www.youtube.com/channel/UCgwcUc4dd2M4gPBbVbLsh7Q">
                    Jake Gallen
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      </Container>
    </>
  )
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
})
