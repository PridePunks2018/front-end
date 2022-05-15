import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Link,
  NumberDecrementStepper,
  NumberInput,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

const MintInputBox = ({ value, setValue, doMint }) => {
  return (
    <>
      {' '}
      <Box marginTop={'1.5em'}>
        <NumberInput
          defaultValue={1}
          min={1}
          max={2000}
          keepWithinRange={true}
          size="lg"
          onChange={(valueString) => {
            parseInt(valueString)
              ? setValue(Math.ceil(parseInt(valueString)))
              : setValue(1)
          }}
          value={value}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Button
        mt={10}
        w={'full'}
        bg={'green.400'}
        color={'white'}
        rounded={'xl'}
        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
        _hover={{
          bg: 'green.500',
        }}
        _focus={{
          bg: 'green.500',
        }}
        // onClick={() => doMint()}
      >
        Mint PAUSED
      </Button>
    </>
  )
}

export default MintInputBox
