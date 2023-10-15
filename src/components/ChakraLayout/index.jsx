import React, { useEffect, useState } from 'react';
import {

    Box,
    CloseButton,
    Flex,

    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay

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


// Popup  options 
// import {useDisclosure } from '@chakra-ui/react';


// Pages we have on the website 
import { Link, Routes, Route } from 'react-router-dom';
import ViewPost from '../Pages/Post/ViewPost';
import Search from '../Pages/Search';
import Profile from '../Pages/@auth/profileDashboard/Profile';
import Chat from '../Pages/@auth/Chat/Chat';
import MessagePage from '../Pages/@auth/Chat/MessagePage';
// import AuthHome
// Your LinkItems array
import AuthHome from '../Pages/@auth/Home/index'
import NotFound from '../Pages/NotFound';
import NewPost from '../components/NewPost';
import { IoMdAddCircle } from 'react-icons/io';
import { BsFillChatDotsFill } from 'react-icons/bs';
import FavoritePage from '../Pages/@auth/FavoritePage/FavoritePage';
import UsersProfile from '../Pages/@auth/profileDashboard/UsersProfile';
import User from '../Admin/User/User';
import AdminPosts from '../Admin/Posts/Posts';
import { useDispatch } from 'react-redux';
import { getNotification } from '../../store/reducers/chat/chatList.reducer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import Challenges from '../Pages/Challenges';
import { MdOutlinePartyMode } from 'react-icons/md';
import AdminReports from '../Admin/Reports/Reports';





// handle the Icon with Name and path 
const LinkItems = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Profile', icon: FiTrendingUp, path: '/profile' },
    { name: 'Search', icon: FiCompass, path: '/search' },
    { name: 'challenges', icon: MdOutlinePartyMode, path: '/challenges' },
    { name: 'Add Post', icon: FiCompass, path: '/addpost' },
    { name: 'Favourites', icon: FiStar , path : '/favorite' },
    {name: 'Chat', icon: BsFillChatDotsFill, path: '/chat'},
    { name: 'Settings', icon: FiSettings },
];


function SidebarContent({ onClose, ...rest }) {
    const { isOpen: isOpenNewPost, onOpen: onOpenNewPost, onClose: onCloseNewPost } = useDisclosure();

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('gray.200', 'gray.900')}
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
                    <NavItem icon={link.icon} name = {link.name}> {link.name}</NavItem>
                </Link>
            ))}
            {/* popup Modal */}

            <Link>
                
            
                <NewPost onCloseNewPost={onCloseNewPost} isOpenNewPost={isOpenNewPost} />
                <NavItem icon={IoMdAddCircle} onClick={onOpenNewPost}   >{'Add New Post'} </NavItem>
            </Link>
        </Box>
    );
}



function SidebarWithHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [render, setRender] = useState(true)
    const dispatch = useDispatch()

    let role = null
    let cookieData = null
  
    if (cookie.load('user_session')) {
  
      cookieData = cookie.load('user_session')
      const token = jwtDecode(cookieData)
        role = token.role
    }



    return (
        <Box minH="100vh" bg={useColorModeValue('gray.300', 'gray.900')}>
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
                    <Route path="/favorite" element={<FavoritePage />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/messages/:id' element={<MessagePage render={render} setRender = {setRender} />} />
                    <Route path="/userProfile" element={<UsersProfile />} />
                    {
                        role === 'admin' &&
                        <>
                            <Route path="/admin/user" element={<AdminPosts/>} />
                            <Route path="/admin/reports" element={<AdminReports/>} />
                        </>
                    }
                    {/* <Route path="/admin/posts" element={<AdminPosts/>} /> */}
                    <Route path="/challenges" element={<Challenges />} />
                    {/* <Route path="/addpost" element={<Profile />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
