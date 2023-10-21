"use client"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import logo3 from '../../assets/logo3.png'
import whiteLogo from '../../assets/logoWhite.png'
import './header.css'
export default function Header_Inhansed({ color, bg }) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box className="header_in">
      <Flex
        //    bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={'0.5px'}
        borderStyle={"solid"}
        borderColor={'#ffffffa6'}
        //    borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue(color)}
            //   color={useColorModeValue("white")}
            fontSize={'20px'}
          >
            <Link to={'/'}>
              <div className="main-logo">

                <img src={whiteLogo} alt="logo" />

              </div>

            </Link>

          </Text>

          {/* <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex> */}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >


          <Button
            as={"a"}
            fontSize={"18px"}
            fontWeight={500}
            variant={"link"}
            color={color}
          //   borderWidth = '1.3px'
          //   borderColor = '#3f72afe0'
          //   borderStyle = 'solid'
          //   py={'8px'}
          //   px={'10px'}
          //   transition={'0.4s'}
          //   _hover={{
          //     bg: "#3f72afe0",
          //      color: 'white',
          //   }}
          //   href={"signin"}
          >
            <Link to={'/signin'}>
              Sign In
            </Link>
          </Button>

          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"16px"}
            fontWeight={500}
            color={bg}
            bg={color}
            //   color={"#29383b"}
            //   bg={"white"}
            borderWidth='1.5px'
            borderColor='#3f72afe0'
            borderStyle='solid'

            _hover={{
              //     bg: "white",
              // color: '#3F72AF',
              // fontWeight : '600'
            }}
          >
            <Link to={'/signup'}> Sign Up </Link>

          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map(child => (
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

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none"
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map(child => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  //   {
  //     label: "Inspiration",
  //     children: [
  //       {
  //         label: "Explore Design Work",
  //         subLabel: "Trending Design to inspire you",
  //         href: "#"
  //       },
  //       {
  //         label: "New & Noteworthy",
  //         subLabel: "Up-and-coming Designers",
  //         href: "#"
  //       }
  //     ]
  //   },
  //   {
  //     label: "Find Work",
  //     children: [
  //       {
  //         label: "Job Board",
  //         subLabel: "Find your dream design job",
  //         href: "#"
  //       },
  //       {
  //         label: "Freelance Projects",
  //         subLabel: "An exclusive list for contract work",
  //         href: "#"
  //       }
  //     ]
  //   },
  //   {
  //     label: "Learn Design",
  //     href: "#"
  //   },
  //   {
  //     label: "Hire Designers",
  //     href: "#"
  //   }
]
