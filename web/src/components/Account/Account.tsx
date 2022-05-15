import { useAccount, useConnect } from 'wagmi'
import { Flex, Text } from '@chakra-ui/react'

const Account = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (accountData) {
    const shortenedAddress = `${accountData?.address.slice(
      0,
      5
    )}...${accountData?.address.slice(-8, -4)}`
    return (
      <Flex flexDirection="column" justifyContent="center">
        <Text fontWeight={'bold'}>
          {accountData.ens?.name
            ? `${accountData.ens?.name}`
            : shortenedAddress}
        </Text>
      </Flex>
    )
  }
  return null
}

export default Account
