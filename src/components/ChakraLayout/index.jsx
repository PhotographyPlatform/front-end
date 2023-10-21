import React, { useState } from 'react';
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
import { useLocation } from 'react-router-dom';
import './sidenav.scss'
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
import cookie from 'react-cookies'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// Popup  options 
// import {useDisclosure } from '@chakra-ui/react';
import { IoMdPhotos } from 'react-icons/io';


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
import Challenges from '../Pages/Challenges';
import { MdOutlinePartyMode } from 'react-icons/md';
import AdminReports from '../Admin/Reports/Reports';
import { BsCamera, BsChatDots } from 'react-icons/bs';
// import { IoImagesOutline } from 'react-icons/io';
import { LuImagePlus } from "react-icons/lu";
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import NotifiList from './notificationList';
import { BsBookmark } from 'react-icons/bs';


// handle the Icon with Name and path 
const LinkItems = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Profile', icon: FiTrendingUp, path: '/profile' },
    { name: 'Search', icon: FiCompass, path: '/search' },
    { name: 'challenges', icon: MdOutlinePartyMode, path: '/challenges' },
    { name: 'Add Post', icon: FiCompass, path: '/addpost' },
    { name: 'Favourites', icon: FiStar, path: '/favorite' },
    { name: 'Chat', icon: BsFillChatDotsFill, path: '/chat' },
    { name: 'Settings', icon: FiSettings },
];


function SidebarContent({ onClose, ...rest }) {
    const { isOpen: isOpenNewPost, onOpen: onOpenNewPost, onClose: onCloseNewPost } = useDisclosure();
    const location = useLocation();

    const isLinkActive = (path) => location.pathname === path;


    return (
        <Box
            className='side-nav-style'
            transition="3s ease"
            // bg={useColorModeValue('gray.200', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Text className="image-logo" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                <img src={logo3} alt="logo" />
            </Text>

            <Link key={1} to={'/'} className="custom-link">
                <NavItem icon={FiHome} name={"Home"} className={isLinkActive('/') ? 'active-link' : ''}>
                    {'Home'}
                </NavItem>
            </Link>
            <Link key={2} to={'/search'} className="custom-link">
                <NavItem icon={FiCompass} name="Search" className={isLinkActive('/search') ? 'active-link' : ''}>
                    {'Search'}
                </NavItem>
            </Link>

            {/* popup Modal */}
            <Link key={3} className="custom-link">
                <NewPost onCloseNewPost={onCloseNewPost} isOpenNewPost={isOpenNewPost} />
                <NavItem icon={LuImagePlus} onClick={onOpenNewPost}>
                    {'Add New Post'}
                </NavItem>
            </Link>
            <Link key={4} to={'/challenges'} className="custom-link">
                <NavItem icon={BsCamera} name={"Challenges"} className={isLinkActive('/challenges') ? 'active-link' : ''}>
                    {'Challenges'}
                </NavItem>
            </Link>
            <Link key={6} to={'/chat'} className="custom-link">
                <NavItem icon={BsChatDots} name={"Chat"} className={isLinkActive('/chat') ? 'active-link' : ''}>
                    {'Chat'}
                </NavItem>
            </Link>
            <Link key={5} to={'/favorite'} className="custom-link">
                <NavItem icon={BsBookmark} name={"Favourites"} className={isLinkActive('/favorite') ? 'active-link' : ''}>
                    {'Favourites'}
                </NavItem>
            </Link>
            <Link key={5} to={'/profile'} className="custom-link">
                <NavItem icon={FiTrendingUp} name={"Profile"} className={isLinkActive('/profile') ? 'active-link' : ''}>
                    {'Profile'}
                </NavItem>
            </Link>
        </Box >
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
        <Box minH="100vh" >
            <SidebarContent onClose={() => onClose()} display={{ base: 'none', md: 'block' }} style={{ backgroundColor: '#DBE2EF' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent >
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4" style={{ backgroundColor: '#F9F7F7' }}>

                {/* Body App js */}

                <Routes>
                    <Route path="/vv" element={<ViewPost />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/" element={<AuthHome />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorite" element={<FavoritePage />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/messages/:id' element={<MessagePage render={render} setRender={setRender} />} />
                    <Route path="/userProfile" element={<UsersProfile />} />

                    {
                        role === 'admin' &&

                        <>

                            {/* <Route path="/admin/user" element={<AdminPosts/>} /> */}
                            <Route path="/admin/reports" element={<AdminReports />} />
                        </>

                    }

                    <Route path="/challenges" element={<Challenges />} />
                    {/* <Route path="/addpost" element={<Profile />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;
