import { Box, Button, Spacer, Text } from '@chakra-ui/react'
import Ticker from 'react-ticker'
import { Image } from '@chakra-ui/react'
import PunkAvatar from '../PunkAvatar/PunkAvatar'

const Tick = () => {
  return (
    <>
      <Box bgColor={'blue.400'}>
        <Ticker>
          {({ index }) => {
            const punkNumber = Math.floor(Math.random() * 10000)
            const imgLink = `https://pridepunk.s3.amazonaws.com/336pxPridePunk/${punkNumber
              .toString()
              .padStart(4, 0)}.png`
            return (
              <>
                <Box margin="30px">
                  <PunkAvatar punkUrl={imgLink} punkNumber={punkNumber} />
                </Box>
                {/* <Image
                  marginLeft={'15px'}
                  marginBottom={'50px'}
                  boxSize="250px"
                  objectFit="cover"
                  src={imgLink}
                  alt=""
                /> */}
              </>
            )
          }}
        </Ticker>
        {/* <Ticker direction="toRight" offset={'100'}>
          {({ index }) => {
            const imgLink = `https://pridepunk.s3.amazonaws.com/336pxPridePunk/${Math.floor(
              Math.random() * 10000
            )
              .toString()
              .padStart(4, 0)}.png`
            return (
              <>
                <Image
                  marginLeft={'15px'}
                  boxSize="250px"
                  objectFit="cover"
                  src={imgLink}
                  alt=""
                  border={'2px'}
                />
              </>
            )
          }}
        </Ticker> */}
      </Box>
    </>
  )
}

export default Tick
