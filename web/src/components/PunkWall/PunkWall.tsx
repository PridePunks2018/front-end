import { Grid, Image, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/utils/useWindowDimentions'

const baseImageURL = 'https://pridepunk.s3.amazonaws.com/336pxPridePunk/'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

const PunkWall = () => {
  const [isLargerThan680] = useMediaQuery('(min-width: 680px)')
  const { height, width } = useWindowDimensions()
  const [render, setRender] = useState(false)

  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setRender(true)
    }, 2000)
    return () => clearTimeout(timerFunc)
  }, [])

  const punkGenerator = Array.from(
    { length: 200 },
    () =>
      `${baseImageURL}${getRandomInt(1, 9999).toString().padStart(4, `0`)}.png`
  )

  // const [punks, setPunks] = useState(punkGenerator)

  // useEffect(() => {
  //   setPunks(
  //     Array.from(
  //       { length: 500 },
  //       () =>
  //         `${baseImageURL}${getRandomInt(1, 9999)
  //           .toString()
  //           .padStart(4, `0`)}.png`
  //     )
  //   )
  // }, [width])

  if (!render) return <></>

  return (
    <Grid
      // templateRows="repeat( 100, minmax(40px, 1fr) )"
      // templateColumns="repeat( 100, minmax(40px, 1fr) )"
      templateColumns={"repeat(auto-fill, 20px)"}

      // position={'absolute'}
      overflowX={'hidden'}
      maxWidth={'100vw'}
      maxHeight={'100%'}
      gridGap={'10px'}
    >
      {punkGenerator.map((punk, index) => {
        return (
          <Image
            key={index}
            opacity={'0.50'}
            // maxWidth={`${getRandomInt(1, 400)}px`}
            margin={'2px'}
            src={punk}
            alt={`PridePunk#`}
            // transform={`rotate(${getRotation()})`}
            _hover={{ opacity: `1.0`, transform: 'scale(9)', zIndex: '10' }}
          />
        )
      })}
    </Grid>
  )
}

export default PunkWall
