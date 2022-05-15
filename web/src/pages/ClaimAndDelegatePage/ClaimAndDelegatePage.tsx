import { Button, Container, Flex, Text, Link, Switch } from '@chakra-ui/react'
import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DelegateCard from 'src/components/DelegateCard/DelegateCard'
import responses from './responses.json'

// function shuffleArray(array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1))
//     var temp = array[i]
//     array[i] = array[j]
//     array[j] = temp
//   }
//   return array
// }

const ClaimAndDelegatePage = () => {
  const [showAll, setShowAll] = React.useState(false)

  return (
    <>
      <MetaTags title="Stewards" description="ClaimAndDelegate page" />

      <Flex flexDirection={'row'} marginTop={'5vh'}>
        <Flex
          width={'100vw'}
          marginTop={'60px'}
          flexDirection={'column'}
          marginLeft={'20px'}
        >
          <Text fontSize={['lg', 'xxx-large']} fontWeight={'bold'}>
            {' '}
            🌈 Pride Punk Stewards (BETA!)
          </Text>
          <Text fontSize={'large'}>
            Stewards are individuals in the Pride Punk Community who have asked
            to be entrusted with your voting power. To apply to be a steward,
            fill out{' '}
            <Link
              color={'blue.400'}
              href={'https://hbqz4d3c3ab.typeform.com/to/HL4WZHCJ'}
              isExternal
            >
              this form
            </Link>
            .
          </Text>
          <Text fontSize={'medium'} fontWeight={'light'}>
            Learn more about delegation, how to claim your vote, and how the DAO
            works{' '}
            <Link
              color={'blue.400'}
              href="https://pridepunks.notion.site/Pride-Punk-DAO-Instructions-10ac5ae9f4954b4ca369a57dd047e9a0"
              isExternal
            >
              here
            </Link>
            .
          </Text>
    <Text fontWeight={'semibold'}>Only Stewards who hold Pride Punk Tokens are shown.</Text>

          {/* <Text>
            Show only Token Holders: <Switch onClick={() => setShowAll(!showAll)} />
          </Text> */}
        </Flex>
      </Flex>
      <Flex
        flexDirection={'row'}
        maxWidth={'100%'}
        flexWrap={'wrap'}
        alignItems={'stretch'}
      >
        {responses.map((response, index) => (
          <DelegateCard key={index} response={response} showAll={showAll} />
        ))}
        {/* {shuffleArray(responses).map((response, index) => (
          <DelegateCard key={index} response={response} />
        ))} */}
      </Flex>
    </>
  )
}

export default ClaimAndDelegatePage
