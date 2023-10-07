import React from 'react';
import "./style/navbar.scss"
import "./style/phone.scss"
import "./style/profile.scss"
import { FaHome, FaUser, FaSearch, FaSign } from 'react-icons/fa';
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

// ⚠  Attention !!! ⚠

// This page is for the NavBar and NavSideBar. The page has two parts: one for mid and large screens and another for phone screens.
import NavMenuList from './MenuList.jsx';
import DrawerPhone from './DrawerPhone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../store/reducers/auth/user.reducer';


function SideNavBar(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logOut());
        navigate('/signin');

    };
    return (
        <nav>
            <div className='phone-item'>
                {/* This header is only for phones;
                    no editing is required here
                */}
                <header className='phone-nav-header'>
                    <h1 className='phoneLogo'>LOGO </h1>
                    <DrawerPhone />
                </header>

            </div>

            <div className='parent'>
                <div className='link-card nav-menu-phone-list'>
                    <NavMenuList />
                    <span className='links-title more-title'>
                        More
                    </span>

                </div>

                <div className='logo'>LOGO</div>
                <div className='Links'>

                    <div className='link-card hover-nav'>
                        <FaHome />
                        <Link href='/'>
                            <span className='links-title' >
                                Home
                            </span>
                        </Link>
                    </div>

                    <div className='link-card hover-nav'>
                        <FaUser />
                        <Link href='profile'>
                            <span className='links-title'>
                                Profile
                            </span>
                        </Link>
                    </div>

                    <div className='link-card hover-nav' >
                        <FaSearch />
                        <span className='links-title'>
                            Search
                        </span>
                    </div>

                    <div className='link-card nav-menu-list'>
                        <NavMenuList className='mid-nav-menu' />
                        <span className='links-title more-title mid-nav-menu  disable-hover'>
                            More
                        </span>

                    </div>

                    <div className='link-card hover-nav'>
                        <FaSign />
                        <span className='links-title' onClick={onOpen}>
                            Log Out
                        </span>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalBody>
                                    Are You Sure To Logout?
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={handleLogout}>
                                        Logout
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>

                    {/*
                     You can add a new URL here. The link appears in the  NavSideBar for mid and large screens, and at the bottom for phones


                    can add url like this oen like this one 
                                   ⬇⬇⬇⬇⬇⬇

                   <div className='link-card nav-menu-list'>
                        <NavMenuList />
                        <span className='links-title more-title'>
                            More
                        </span>

                    </div>
                    
                    
                    */}


                    {/*This contains user data and a link to the profile */}
                    <div className='link-card parent-profile'>
                        <img src="https://i.pinimg.com/564x/1e/71/f0/1e71f00386068f5735d579f0f94b9af7.jpg" alt="" />
                        <span className='links-title disable-hover'>
                            Jhon Doe
                        </span>

                    </div>



                </div>

            </div>
        </nav>
    );
}

export default SideNavBar;