import {
  Flex,
  Stack,
  Text,
  VStack,
  Heading,
  StackDivider,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
} from '@chakra-ui/react'

export default function Faq() {
  const linkHoverColor = useColorModeValue('gray.100', 'white')

  return (
    <Flex
      width={'100vw'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      marginTop={'1em'}
    >
      <Heading
        lineHeight={1.1}
        margin={'1em'}
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
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
        PridePunk FAQ
      </Heading>
      <Flex alignItems={'center'} maxWidth={['95vw', '60vw']}>
        <Accordion>
          {questions.map((el, index) => (
            <div key={index}>
              <AccordionItem margin={'1em'}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text
                        fontSize={['md', '2xl']}
                        fontWeight={'extrabold'}
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                          bgGradient: `linear-gradient(
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
                                        )`,
                          bgClip: 'text',
                        }}
                      >
                        {el.question}
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text fontSize={'lg'} fontWeight={'light'}>
                    {el.answer}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <StackDivider borderColor={'gray.200'} />
            </div>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  )
}

const questions = [
  {
    question: 'Are NFTs minted in 2018 and 2022 on different contracts?',
    answer: 'No, all NFTs are minted on the original 2018 contract.',
  },
  {
    question: 'Are these NFTs original 2018 NFTs?',
    answer:
      'The original Mint was never finished, only two tokens were minted in 2018. With the mint reopening, these are 2022 NFTs minted on the original 2018 contract.',
  },
  {
    question:
      'If Pridepunks are from 2018, can I un-wrap the 2022 smart contract?',
    answer:
      'No, PridePunks are not wrapped. All PridePunks minted are NFTs on the original 2018 NFT Contract.',
  },
  // {
  //   question:
  //     'I know the images were created in 2018, but when someone mints the nft in 2022 does it actually have the real metadata from 2018?',
  //   answer:
  //     'No, PridePunks never had metadata in the modern sense, only an image. Orignal CryptoPunks also *do not have metadata*. PridePunks were always an image.',
  // },
  // {
  //   question:
  //     'What do you mean CryptoPunks do not have Metadata?!?! I see the metadata on Opensea!',
  //   answer:
  //     "Surprise! No, CryptoPunks do not have onchain metadata. The data you see on Opensea, ('alien', 'ape', etc...) is provided by the Larva Labs API. It is entirely off chain information! It was never on the blockchain!",
  // },
  // {
  //   question: "Okay tell me more, I don't believe you.",
  //   answer:
  //     'Check the LarvaLabs website and the smart contract. CryptoPunks are not NFTs. The only information on chain is a hash of the image. Want to have your mind blown? There is no on-chain link between CryptoPunk images and the token Id. (Seriously)',
  // },
  {
    question: 'How many NFTs were minted in 2018?',
    answer:
      'Two NFTs were minted in 2018. ~150 Tokens were minted in March 2022 as part of rediscovery and testing. Users found the contract and started minting in excitement before the minting was paused.',
  },
  {
    question: 'Does the wrapper hold the new token? How does this work?',
    answer:
      'The MetaPunk Controller contract is the Owner of the original 2018 contract. It controls it completely. At the end of the mint ownership will be transfered to the PridePunkDao contract. Voters can decide to burn the ownership key, locking the 2018 contract forever.',
  },
  {
    question: 'Is the mint function on the 2018 unlimimted?',
    answer:
      'No. The 2018 contract is designed to be used with a Controller contract. The controller contract limits the possible number of minted NFTs to 10,000.',
  },
  {
    question: "Is there a 'wrapper' contract? And does it hold the NFTs?",
    answer:
      "No. PridePunks are not wrapped Tokens. The NFTs are all minted on the 2018 contract, which is what the user receives. There is a 'controller' contract that owns the original 2018 contract to manage minting.",
  },
  {
    question: 'But I heard talk about a wrapper? What does this mean?',
    answer:
      "Originally in the design of the 2018 system (which was not very good), it was required that you 'wrap' a real CryptoPunk before you could mint a PridePunk. This functionality was a bad idea and is no longer used. Only two NFTs ever wrapped a real CryptoPunk. The new 2022 Controller impersonates the original CryptoPunk contract and allows to mint PridePunks without wrapping a CryptoPunk.",
  },
  {
    question: 'Did you say PridePunkDao?',
    answer:
      'The PridePunk DAO is comprised of the community of Pride Punk Holders. Their purpose, mission and roadmap is determined collectively by members.',
  },
  {
    question: 'How do we join the DAO?',
    answer:
      'PridePunk holders can claim Vote tokens to participate in the DAO.',
  },
  {
    question:
      'How much control will the creator maintain over the minting/nft contracts?',
    answer: `None. The PridePunk NFT contract post mint is permanently locked.`,
  },
  {
    question: 'What role will the creator have in the project going forward?',
    answer: `The creator will continue as PridePunk DAO community member.`,
  },
  {
    question:
      'What is the relationship between the PridePunk Mint and the PridePunk DAO?',
    answer:
      'The PridePunk Mint was a one time sale of political artwork. The PridePunk DAO is decentralized community of enthusiasts who hold this artwork and who are commited to diversity and inclusion with a LGTBQ+ focus in Web3',
  },
  {
    question: 'Is the DAO funded via the mint?',
    answer:
      'No. The DAO is funded by a portion of royalties from secondary market sales.',
  },
]
