import React, { useState } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { Link, Routes, Route } from 'react-router-dom';
import ViewPost from '../Pages/Post/ViewPost';
import Search from '../Pages/Search';
import Profile from '../Pages/@auth/profileDashboard/Profile';
import Chat from '../Pages/@auth/Chat/Chat';
import MessagePage from '../Pages/@auth/Chat/MessagePage';
// import AuthHome
// Your LinkItems array
const LinkItems = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Trending', icon: FiTrendingUp, path: '/trending' },
    { name: 'Explore', icon: FiCompass, path: '/explore' },
    { name: 'Favourites', icon: FiStar, path: '/favourites' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
];

function SidebarContent({ onClose, ...rest }) {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <VStack spacing={0} align="stretch">
                {LinkItems.map((link) => (
                    <Link key={link.path} to={link.path}>
                        <NavItem icon={link.icon}>{link.name}</NavItem>
                    </Link>
                ))}
            </VStack>
        </Box>
    );
}

function NavItem({ icon, children, ...rest }) {
    return (
        <Box
            as="div"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
}

function MobileNav({ onOpen, ...rest }) {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            {/* ... your other mobile navigation components */}
        </Flex>
    );
}

function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [render, setRender] = useState(true)


    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Routes>
                    <Route path="/vv" element={<ViewPost />} />
                    <Route path="/searchs" element={<Search />} />
                    {/* <Route path="/" element={<AuthHome />} /> */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/messages/:id' element={<MessagePage render={render} setRender = {setRender} />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
