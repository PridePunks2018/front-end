import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
const Explainer = () => {
  const [isDesktop] = useMediaQuery('(min-width: 767px)')

  const imgSrc = () =>
    `https://pridepunk.s3.amazonaws.com/336pxPridePunk/${Math.round(
      Math.random() * 9999
    )
      .toString()
      .padStart(4, `0`)}.png`
  return (
    <Box
      overflowX={'hidden'}
      bgColor={'blue.500'}
      marginBottom={'50px'}
      marginTop={'50px'}
      zIndex={'1020'}
    >
      <Flex
        flexDirection={isDesktop ? 'row' : 'column'}
        justifyContent={'space-around'}
        alignItems={'center'}
        marginLeft={isDesktop ? '4em' : '0em'}
        zIndex={'10'}
      >
        <Flex
          flexDirection={'column'}
          maxWidth={isDesktop ? '40vw' : '80vw'}
          marginTop={'2em'}
          marginBottom={'2em'}
          zIndex={'10'}
        >
          <Text
            fontSize="5xl"
            color={'white'}
            fontWeight={'extrabold'}
            marginBottom={'1em'}
          >
            What are PridePunks?
          </Text>
          <Box>
            <Text fontSize={'xl'} color={'white'} marginBottom={'1em'}>
              PridePunks were launched Jun 23, 2018 as a celebration of
              CryptoPunks, Pride month and a statement on the lack of
              inclusivity of Web3.{' '}
            </Text>
            <Text fontSize={'xl'} color={'white'} marginBottom={'1em'}>
              They were created at a time when LarvaLabs Punks traded for mere
              dollars and were intended to be a collaborative project to make
              Punks more exciting.
            </Text>
            <Text fontSize={'xl'} color={'white'} marginBottom={'1em'}>
              Now they are back, using the original MetaPunk smart contract from
              2018, and ready to spread rainbow love in 2022.
            </Text>
            <Text fontSize={'xl'} color={'white'} marginBottom={'1em'}>
              It's NFT History at it's finest!
            </Text>
            <Text fontSize={'xl'} color={'white'} marginBottom={'1em'}>
              (PridePunks are not affiliated with LarvaLabs)
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Image
            src={imgSrc()}
            alt="pridepunk"
            alignSelf={'center'}
            marginRight={'4em'}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Explainer
