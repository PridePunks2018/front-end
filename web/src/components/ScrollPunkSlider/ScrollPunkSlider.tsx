import { Image, Box, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

// create a random array of punks maybe ten wide
const randomArray = (length, max) =>
  [...new Array(length)].map(
    () =>
      `https://pridepunk.s3.amazonaws.com/336pxPridePunk/${Math.round(
        Math.random() * max
      )
        .toString()
        .padStart(4, `0`)}.png`
  )

const ScrollPunkSlider = ({ direction }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [punkArray, _] = useState(randomArray(40, 9999))

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Flex
      flexDirection={'row'}
      minWidth={'400vw'}
      transform={`translate(${
        direction ? scrollPosition - 4000 : 10 - scrollPosition
      }px)`}
    >
      {punkArray.map((el, index) => (
        <div key={index}>
          <Image src={el} alt="pridepunk" margin={'5px'} maxHeight={'200px'} />
        </div>
      ))}
    </Flex>
  )
}

export default ScrollPunkSlider
