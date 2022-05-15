import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Image,
  Link,
} from '@chakra-ui/react'

import announcement from './announcement.png'
import matt200 from './matt2000.png'

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>
}

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  )
}

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function Timeline() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')} marginTop={'50px'}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Historical Timeline</Heading>
          <Text>The history of PridePunks</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Announcement</TestimonialHeading>
              <TestimonialText>
                The original smart contract was launched in June 23, 2018. It
                originally required that you wrap your punk in the contract to
                mint a PridePunk.
                <br />
                <Image
                  src={announcement}
                  _hover={{
                    opacity: `1.0`,
                    transform: 'scale(2)',
                    zIndex: '10',
                  }}
                />
                <Link
                  href="https://discord.com/channels/329381334701178885/329381334701178885/460157436108603402"
                  isExternal
                  color={'blue.400'}
                >
                  Proof on LarvaLabs discord
                </Link>
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'https://pridepunk.s3.amazonaws.com/336pxPridePunk/1832.png'}
              name={'June 2018'}
              title={'Deployment of original contract'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Code Review</TestimonialHeading>
              <TestimonialText>
                At the time Dennison was a pretty crap solidity developer, so
                after building the contracts and dropping the first two
                PridePunks, he realized the code was a mess and it would be
                ridiculous to ask folks to use it in public. Disappointed, he
                went back to learning solidity. Time passed, and so it seemed,
                PridePunks with it...
                <Image></Image>
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'https://pridepunk.s3.amazonaws.com/336pxPridePunk/1832.png'}
              name={'July 2018'}
              title={'Mothball of project'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Mint Reopens</TestimonialHeading>
              <TestimonialText>
                After digging up the contracts, verifying them on etherscan, and
                building a secure wrapper that no longer requires you to lock up
                your punk- PridePunks are finally ready to securely launch!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'https://pridepunk.s3.amazonaws.com/336pxPridePunk/1832.png'}
              name={'March 2022'}
              title={'Rediscovery and Mint'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
