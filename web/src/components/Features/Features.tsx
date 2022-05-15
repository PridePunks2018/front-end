import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Image,
  Flex,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Replace test data with your own
// const features = Array.apply(null, Array(8)).map(function (x, i) {
//   return {
//     id: i,
//     title: 'The First Punk Derivative',
//     text: 'Created in 2018 before Punks became NFT superstars. ',
//   };
// });

const features = [
  {
    id: 1,
    title: 'THE First Punk Derivative',
    text: 'Created in 2018 before Punks became NFT superstars as a way to make Punks feel more fun.',
  },
  {
    id: 2,
    title: 'An Early Crypto NFT Experiment',
    text: 'Predating CryptoSkulls by a year, PridePunks are a wild experiment in remixing Art',
  },
  {
    id: 5,
    title: 'Are you affiliated with LarvaLabs?',
    text: 'No. PridePunks is an entirely separate, unrelated, derivative art project.',
  },
  {
    id: 4,
    title: 'Verified Smart Contracts',
    text: 'Smart contracts available on Etherscan for open review.',
  },
]

export default function Features() {
  return (
    <Box p={4}>
      <Stack
        spacing={4}
        as={Container}
        maxW={'3xl'}
        textAlign={'center'}
        marginTop={'50px'}
      >
        <Heading
          fontSize={'5xl'}
          bgGradient="linear-gradient(
              45deg,
              rgba(203, 43, 29, 1) 20%,
              rgba(236, 108, 65, 1),
              rgba(253, 246, 82, 1),
              rgba(84, 184, 53, 1)20%,
              rgba(68, 153, 247, 1),
              rgba(0, 0, 125, 1),
              rgba(43, 3, 149, 1),
          )"
          bgClip="text"
        >
          Specifications
        </Heading>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Image
            maxWidth={{ base: '100px', md: '150px', lg: '200px' }}
            src={'https://pridepunk.s3.amazonaws.com/336pxPridePunk/0000.png'}
          />
        </Flex>
        <Text color={'gray.600'} fontSize={'xl'}>
          All your questions about this historical 2018 NFT project, answered!
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
