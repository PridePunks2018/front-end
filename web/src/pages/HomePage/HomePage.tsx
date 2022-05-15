import { Box, Flex, Grid, Image, GridItem } from '@chakra-ui/react'
import Features from 'src/components/Features/Features'
import Hero from 'src/components/Hero/Hero'
import ScrollPunkSlider from 'src/components/ScrollPunkSlider/ScrollPunkSlider'
import Explainer from 'src/components/Explainer/Explainer'

import Timeline from 'src/components/Timeline/Timeline'

import PunkWall from 'src/components/PunkWall/PunkWall'
import Faq from 'src/components/FAQ/Faq'

import abi from 'src/abi/abi'
import tokenAbi from 'src/abi/metaPunkTokenAbi'
import wrappedEthAbi from 'src/abi/uniswap'

import { useToast, useMediaQuery } from '@chakra-ui/react'
import { useContractEvent, useAccount, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { useEffect } from 'react'

const baseImageURL = 'https://pridepunk.s3.amazonaws.com/336pxPridePunk/'

const rainbow = [
  { r: 203, g: 43, b: 29 },
  { r: 236, g: 108, b: 65 },
  { r: 253, g: 246, b: 82 },
  { r: 84, g: 184, b: 53 },
  { r: 68, g: 153, b: 247 },
  { r: 0, g: 0, b: 125 },
  { r: 43, g: 3, b: 149 },
]

// lol, really should just do a function for this
const rainbowArray = [
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
  ...rainbow,
]

const HomePage = () => {
  const toast = useToast()
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)')

  // const MPC_ADDRESS = '0x67401149E3e88B10DD92821EB6302F4DeE8191bC'
  // const tokenAddress = '0x0144B7e66993C6BfaB85581e8601f96BFE50c9Df'

  return (
    <Box overflowX={'hidden'}>
      <Hero />
      {/* <PunkWall /> */}

      <Explainer />
      <Box overflowX={'hidden'} marginTop={'20px'} marginBottom={'20px'}>
        <ScrollPunkSlider direction={true} />
        <ScrollPunkSlider direction={false} />
        <ScrollPunkSlider direction={true} />
        <Timeline />
        <Grid
          templateColumns="repeat(77, 1fr)"
          gap={0}
          zIndex={'-1'}
          position={'relative'}
        >
          {rainbowArray.map((color, index) => (
            <GridItem
              key={index}
              w="100%"
              h="500"
              bg={`rgb(${color.r}, ${color.g}, ${color.b})`}
            />
          ))}
        </Grid>
        <Features />
        <Grid
          templateColumns="repeat(77, 1fr)"
          gap={0}
          zIndex={'-1'}
          position={'relative'}
        >
          {rainbowArray.map((color, index) => (
            <GridItem
              key={index}
              w="100%"
              h="10"
              bg={`rgb(${color.r}, ${color.g}, ${color.b})`}
            />
          ))}
        </Grid>
        <Faq />
      </Box>
    </Box>
  )
}

export default HomePage
