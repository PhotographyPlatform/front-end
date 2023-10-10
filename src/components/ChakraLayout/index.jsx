import React from 'react';
import {

    Box,
    CloseButton,
    Flex,

    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,

} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
} from 'react-icons/fi';

// Other Components  fro nav 
import NavItem from './NavItem';
import MobileNav from './MobileNav';




// Pages we have on the website 
import { Link, Routes, Route } from 'react-router-dom';
import ViewPost from '../Pages/Post/ViewPost';
import Search from '../Pages/Search';
import Profile from '../Pages/@auth/profileDashboard/Profile';
import AuthHome from '../Pages/@auth/Home/index'
import NotFound from '../Pages/NotFound';

// handle the Icon with Name and path 
const LinkItems = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Profile', icon: FiTrendingUp, path: '/profile' },
    { name: 'Search', icon: FiCompass, path: '/search' },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings },
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
            {LinkItems.map((link) => (
                <Link key={link.path} to={link.path}>
                    <NavItem icon={link.icon}>{link.name}</NavItem>
                </Link>
            ))}
        </Box>
    );
}



function SidebarWithHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose()} display={{ base: 'none', md: 'block' }} />
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

                {/* Body App js */}

                <Routes>
                    <Route path="/vv" element={<ViewPost />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/" element={<AuthHome />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
