import {
  Grid,
  SimpleGrid,
  GridItem,
  Image,
  Flex,
  Text,
  Link,
} from '@chakra-ui/react'
import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import {
  LazyLoadImage,
  LazyLoadComponent,
} from 'react-lazy-load-image-component'

const isDead = (tokenId) => {
  const specials = [
    635, 2890, 3100, 5822, 5905, 6089, 7523, 7804, 372, 1021, 2140, 2243, 2386,
    2460, 2491, 2711, 2924, 4156, 4178, 4464, 5217, 5314, 5577, 5795, 6145,
    6915, 6965, 7191, 8219, 8498, 9265, 9280,
  ]

  return specials.includes(tokenId) || tokenId >= 9672
}

const prefix = 'https://pridepunk.s3.amazonaws.com/336pxPridePunk/'

// const ImageComponent = ({ image }) => {
//   return (
//     <LazyLoadImage
//     delayMethod='throttle'
//       // alt={image.alt}
//       // height={image.height}
//       src={image.src} // use normal <img> attributes as props
//       // width={image.width}
//     />
//   )
// }

const GalleryPage = () => {
  const getImages = (start = 0, length) => {
    return Array.from({ length }, (_, x) => ({
      src: `${prefix}${(start + x).toString().padStart(4, '0')}.png`,
      isDead: isDead(x + start),
    }))
  }

  const [images, setImages] = useState([...getImages(0, 20)])

  useEffect(() => {
    let interval
    if (images.length <= 10000) {
      interval = setInterval(() => {
        setImages([...images, ...getImages(images.length, 20)])
      }, 1)
    }
    return () => clearInterval(interval)
  }, [images])

  console.log('tokens', images)

  return (
    <>
      <MetaTags title="Gallery" description="Gallery page" />

      <SimpleGrid minChildWidth="120px" spacing="10px" marginTop={'80px'}>
        {images.map((token, index) => (
          <Flex
            key={index}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {' '}
            <Link
              href={
                token.isDead
                  ? ''
                  : `https://opensea.io/assets/0x0144b7e66993c6bfab85581e8601f96bfe50c9df/${index}`
              }
              isExternal
            >
              <Image
                src={token.src}
                filter={token.isDead ? 'grayscale(var(--value, 100%))' : ''}
                _hover={{
                  transform: 'scale(1.2)',
                  filter: token.isDead ? 'grayscale(var(--value, 100%))' : '',
                }}
              />
              <Text>
                PP # {token.isDead ? '0xDEAD' : index.toString().padStart(4, 0)}
              </Text>
            </Link>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  )
}

export default GalleryPage
