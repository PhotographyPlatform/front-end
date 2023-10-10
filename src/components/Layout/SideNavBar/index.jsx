// import React, { useEffect } from 'react';
// import "./style/navbar.scss"
// import "./style/phone.scss"
// import "./style/profile.scss"
// import { FaHome, FaUser, FaSearch, FaSign } from 'react-icons/fa';
// import { BsFillChatDotsFill  } from 'react-icons/bs';
// import { IoMdAddCircle } from 'react-icons/io';
// import cookies from 'react-cookies'
// // import React, { useEffect } from 'react';
// // import "./style/navbar.scss"
// // import "./style/phone.scss"
// // import "./style/profile.scss"
// // import { FaHome, FaUser, FaSearch, FaSign } from 'react-icons/fa';
// // import { BsFillChatDotsFill } from 'react-icons/bs';
// // import { IoMdAddCircle } from 'react-icons/io';
// // import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
// // import cookies from 'react-cookies'
// // import { NavLink } from 'react-router-dom';
// // import NavMenuList from './MenuList.jsx';
// // import DrawerPhone from './DrawerPhone';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { logOut } from '../../../store/reducers/auth/user.reducer';
// // import { Link } from 'react-router-dom';
// // import { BsChatDotsFill } from 'react-icons/bs';

// // import { uderData } from '../../../store/reducers/auth/user.reducer'


// // import NewPost from '../../components/NewPost';

// import { uderData } from '../../../store/reducers/auth/user.reducer'
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Flex,
//     Avatar,
//     Heading,
//     Text,
//     IconButton,
//     Image,
//     Box,
//     Stack,
//     FormControl,
//     FormLabel,
//     Input,
//     Select,
//     HStack,
//     Container,
//     Checkbox,
//     Divider,
//     Center,
//     Grid,
//     GridItem,
//     Icon,
//     useDisclosure
// } from '@chakra-ui/react';
// // // ⚠  Attention !!! ⚠

// // // This page is for the NavBar and NavSideBar. The page has two parts: one for mid and large screens and another for phone screens.

// // import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
// // import { NavLink } from 'react-router-dom';
// // import NavMenuList from './MenuList.jsx';
// // import DrawerPhone from './DrawerPhone';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { logOut } from '../../../store/reducers/auth/user.reducer';

// import { Link } from 'react-router-dom';
// import { BsChatDotsFill } from 'react-icons/bs';


// // // I adhere to the rules in the comment to add a link

// // // If you don't know how to handle the link , contact with Mohammad Attallah, don't try anything else here. This is not a perfect place to try something you don't know how it works. 



// // //                      ⬆⬆⬆⬆⬆⬆
// // // read the Comment Carefully 


// // function SideNavBar(props) {
// //     // User Data 
// //     const userState = useSelector(state => state.user);
// //     const userData = userState.user;
// //     const dispatch = useDispatch();
// //     const userDataCookies = cookies.load('user')
// //     useEffect(() => {
// //         dispatch(uderData(userDataCookies))
// //     }, [])

// //     const { isOpen, onOpen, onClose } = useDisclosure();
// //     const { isOpen: isOpenNewPost, onOpen: onOpenNewPost, onClose: onCloseNewPost } = useDisclosure();
// // };
// // const notificationState = useSelector((state) => state.ChatList.AllNotification);

// // console.log("Srtate ", userData.username)
// // return (
// //     <nav>
// //         <div className='phone-item'>

// //             {/* This header is only for phones;
// //                     no editing is required here !!
// //                 */}

// //             <header className='phone-nav-header'>
// //                 <h1 className='phoneLogo'>LOGO </h1>
// //                 <DrawerPhone />
// //             </header>

// //         </div>

// //         <div className='parent'>
// //             <div className='link-card nav-menu-phone-list'>
// //                 <NavMenuList />
// //                 <span className='links-title more-title'>
// //                     More
// //                 </span>
// //             </div>

// //             <div className='logo'>LOGO</div>

// //             {/* You Can Edit the links fromh ere */}
// //             <div className='Links'>
// //                 <NavLink to='/' className='link-card hover-nav'>

// //                     <FaHome />
// //                     <span className='links-title'>Home</span>

// //                 </NavLink>





//     // };
//     // const notificationState = useSelector((state) => state.ChatList.AllNotification);
// //                 <div to='/addpost' className='link-card hover-nav' onClick={onOpenNewPost}>
// //                     <NewPost onCloseNewPost={onCloseNewPost} isOpenNewPost={isOpenNewPost} />
// //                     <IoMdAddCircle />
// //                     <span className='links-title'>
// //                         Add Post
// //                     </span>
// //                 </div>

// //                 <NavLink to='/searchs' className='link-card hover-nav'>
// //                     <FaSearch />
// //                     <span className='links-title'>
// //                         Search
// //                     </span>

// //                 </NavLink>

// //                 <NavLink to='/chat' className='link-card hover-nav'>
// //                     <Box position={'relative'} >

// //                         <Box position={'absolute'} display={notificationState ? 'inline-flex' : 'none'} pb={'5px'} bg={'red'} w={'20px'} h={'20px'} borderRadius={'50%'} justifyContent={'center'} alignItems={'center'} top={'-10px'} right={'-10px'}>
// //                             <Text m={0}>{notificationState}</Text>
// //                         </Box>
// //                         <BsFillChatDotsFill />
// //                     </Box>
// //                     <span className='links-title'>
// //                         Chat
// //                     </span>

// //                 </NavLink>

// //                 <div className='link-card nav-menu-list'>
// //                     <NavMenuList className='mid-nav-menu' />
// //                     <span className='links-title more-title mid-nav-menu  disable-hover'>
// //                         More
// //                     </span>
// //                 </div>

//                 // <div className='logo'>LOGO</div>

//                 {/* You Can Edit the links fromh ere */}
//                 // <div className='Links'>
//                 //     <NavLink to='/' className='link-card hover-nav'>

//                 //         <FaHome />
//                 //         <span className='links-title'>Home</span>

//                 //     </NavLink>

//                 //     <div to='/addpost' className='link-card hover-nav' onClick={onOpenNewPost}>
//                 //         <NewPost onCloseNewPost={onCloseNewPost} isOpenNewPost={isOpenNewPost} />
//                 //         <IoMdAddCircle />
//                 //         <span className='links-title'>
//                 //             Add Post
//                 //         </span>
//                 //     </div>

//                 //     <NavLink to='/searchs' className='link-card hover-nav'>
//                 //         <FaSearch />
//                 //         <span className='links-title'>
//                 //             Search
//                 //         </span>

//                 //     </NavLink>
                    
//                 //     <NavLink to='/chat' className='link-card hover-nav'>
//                 //         <Box position={'relative'} >

//                 //             <Box position={'absolute'} display={notificationState ? 'inline-flex' : 'none'} pb={'5px'} bg={'red'} w={'20px'} h={'20px'} borderRadius={'50%'} justifyContent={'center'} alignItems={'center'} top={'-10px'} right={'-10px'}>
//                 //                     <Text m={0}>{notificationState}</Text>
//                 //             </Box>
//                 //             <BsFillChatDotsFill />
//                 //         </Box>
//                 //         <span className='links-title'>
//                 //             Chat
//                 //         </span>
//                 //     </NavLink>

//                 //     <div className='link-card nav-menu-list'>
//                 //         <NavMenuList className='mid-nav-menu' />
//                 //         <span className='links-title more-title mid-nav-menu  disable-hover'>
//                 //             More
//                 //         </span>
//                 //     </div>

//                     {/*
//                      You can add a new URL here. The link appears in the  NavSideBar for mid and large screens, and at the bottom for phones
// //                 {/*
// //                      You can add a new URL here. The link appears in the  NavSideBar for mid and large screens, and at the bottom for phones

                    
// //                     Remember, if you don't know how this  one works, contact Mohammad Attallah. 

// //                     You  can add a URL like this one
                    
// //                                    ⬇⬇⬇⬇⬇⬇

// //                      <NavLink to='/pathexample' 
// //                      className='link-card hover-nav'>
// //                         <Icon />
// //                         <span className='links-title'>
// //                             Link Title
// //                         </span>
// //                     </NavLink>
// //                     */}


// //                 {/*Add the Link Here !!  */}





// //                 {/*This contains user data and a link to the profile */}

// //                 <NavLink to='/profile' className='link-card parent-profile'>
// //                     {userData.img ? (
// //                         <img src={userData.img} alt="" />
// //                     ) : (
// //                         <Avatar
// //                             name={userData.username}
// //                         />
// //                     )}
// //                     <span className='links-title disable-hover'>
// //                         {userData.username}
// //                     </span>
// //                 </NavLink>


// //             </div>

// //         </div>
// //     </nav>
// // );

// // export default SideNavBar;