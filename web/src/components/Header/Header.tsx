// import { Flex, Box, Spacer } from '@chakra-ui/react'
import Account from '../Account/Account'
import Connect from '../Connect/Connect'

// const Header = () => {
//   return (
//     <Flex>
//       <Box p="4" bg="red.400">
//         Pride Punk
//       </Box>
//       <Spacer />
//       <Box p="4" bg="blue.400">
//         <Account />
//       </Box>
//       <Box p="4" bg="green.400">
//        <Connect />
//       </Box>
//     </Flex>
//   )
// }

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useMediaQuery,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

import { useBalance } from 'wagmi'

export default function Header() {
  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: '0xeF352CbB151833842A2D8Baa22ED9E686e5B08AB',
  })

  console.log('Data: ', data)

  const { isOpen, onToggle } = useDisclosure()
  const [isDesktop] = useMediaQuery('(min-width: 767px)')
  return (
    <Box zIndex={'1000'}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        minWidth={'100vw'}
        // backgroundColor={'rgba(255, 255, 255, 0.6)'}
        // backdropFilter={'blur(5px)'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        position={'fixed'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={900}
            fontSize={'xl'}
            bgGradient="linear-gradient(
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
          )"
            bgClip="text"
          >
            <Link href="/">PridePunks</Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
          <Text
            marginLeft={'1em'}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={900}
            fontSize={'xl'}
            bgGradient="linear-gradient(
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
          )"
            bgClip="text"
          >
            TREASURY:{' '}
            {loading ? <Spinner size={'xs'} /> : data?.formatted.slice(0, 5)}{' '}
            ETH
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {isDesktop ? <Account /> : <></>}
          <Connect />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={900}
                color={linkColor}
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
                isExternal={navItem.isExternal}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel, isExternal }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
      isExternal={isExternal}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{
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
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      marginTop={'50px'}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                href={child.href}
                isExternal={child.isExternal}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  isExternal?: boolean
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Links',
    children: [
      {
        label: 'Project Overview',
        href: 'https://pridepunks.notion.site/pridepunks/Pride-Punk-Wiki-0df75b81726b4650bbd922075f47f59e',
        isExternal: true,
      },
      {
        label: 'Provenance',
        subLabel: 'Verify the Metadata Provenance',
        href: 'https://pridepunks.notion.site/Metadata-Provenance-d250a4262143406485c2e5994727388c',
        isExternal: true,
      },
      {
        label: '2018 Smart Contracts',
        subLabel: 'The original PridePunk smart contract system',
        href: 'https://pridepunks.notion.site/Smart-Contracts-2018-abe64e5a25374514ac243c2608f260f1',
        isExternal: true,
      },
      {
        label: '2022 Smart Contracts',
        subLabel: 'PridePunk DAO Contracts and 2022 MetaPunkController',
        href: 'https://pridepunks.notion.site/Smart-Contracts-2022-in-progress-b04e5193ce8e4e538d0de3dc77586b1a',
        isExternal: true,
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/pridepunks2018',
        isExternal: true,
      },
      {
        label: 'View on Rarible',
        href: 'https://pridepunks2018.wlbl.xyz/',
        isExternal: true,
      },
      {
        label: 'Discord',
        href: 'https://discord.gg/pridepunks2018',
        isExternal: true,
      },
      {
        label: 'Disclaimer',
        href: 'https://pridepunks.notion.site/Disclaimer-TOS-584bc6e440994dc981e589b0f38f6db0',
        isExternal: true,
      },
    ],
  },
  {
    label: 'DAO',
    children: [
      {
        label: 'Instructions',
        href: 'https://pridepunks.notion.site/Pride-Punk-DAO-Instructions-10ac5ae9f4954b4ca369a57dd047e9a0',
        isExternal: true,
      },
      {
        label: 'Vote Claim',
        href: '/claim',
      },
      {
        label: 'Pride Punk DAO on Tally',
        href: 'https://www.withtally.com/governance/eip155:1:0x80BAE65E9D56498c7651C34cFB37e2F417C4A703',
        isExternal: true,
      },
    ],
  },

  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Tools',
    children: [
      {
        label: 'Background Generator',
        href: 'https://ipfs.io/ipfs/QmQ4MsS6X7s7pdSzhhSUFTnXZt3EnyCKuhq23YpiGyGpzE/',
        isExternal: true,
      },
    ],
  },
]
