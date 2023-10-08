import React from 'react';
import "./style/navbar.scss"
import "./style/phone.scss"
import "./style/profile.scss"
import { FaHome, FaUser, FaSearch, FaSign } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';


// ⚠  Attention !!! ⚠

// This page is for the NavBar and NavSideBar. The page has two parts: one for mid and large screens and another for phone screens.


// I adhere to the rules in the comment to add a link

// If you don't know how to handle the link , contact with Mohammad Attallah, don't try anything else here. This is not a perfect place to try something you don't know how it works. 



//                      ⬆⬆⬆⬆⬆⬆
// read the Comment Carefully 





import { NavLink } from 'react-router-dom';


import NavMenuList from './MenuList.jsx';
import DrawerPhone from './DrawerPhone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../store/reducers/auth/user.reducer';
import { Link } from 'react-router-dom';
import NewPost from '../../components/NewPost';



function SideNavBar(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenNewPost, onOpen: onOpenNewPost, onClose: onCloseNewPost } = useDisclosure();

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
                    no editing is required here !!
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

                {/* You Can Edit the links fromh ere */}
                <div className='Links'>
                    <NavLink to='/' className='link-card hover-nav'>

                        <FaHome />
                        <span className='links-title'>Home</span>

                    </NavLink>



                    <div to='/addpost' className='link-card hover-nav' onClick={onOpenNewPost}>
                        <NewPost onCloseNewPost={onCloseNewPost} isOpenNewPost={isOpenNewPost}/>
                        <IoMdAddCircle />
                        <span className='links-title'>
                            Add Post
                        </span>
                    </div>

                    <NavLink to='/searchs' className='link-card hover-nav'>
                        <FaSearch />
                        <span className='links-title'>
                            Search
                        </span>

                    </NavLink>

                    <div className='link-card nav-menu-list'>
                        <NavMenuList className='mid-nav-menu' />
                        <span className='links-title more-title mid-nav-menu  disable-hover'>
                            More
                        </span>
                    </div>

                    {/*
                     You can add a new URL here. The link appears in the  NavSideBar for mid and large screens, and at the bottom for phones

                    
                    Remember, if you don't know how this  one works, contact Mohammad Attallah. 

                    You  can add a URL like this one
                    
                                   ⬇⬇⬇⬇⬇⬇

                     <NavLink to='/pathexample' 
                     className='link-card hover-nav'>
                        <Icon />
                        <span className='links-title'>
                            Link Title
                        </span>
                    </NavLink>
                    */}


                    {/*Add the Link Here !!  */}





                    {/*This contains user data and a link to the profile */}

                    <NavLink to='/profile' className='link-card parent-profile'>
                        <img src="https://i.pinimg.com/564x/1e/71/f0/1e71f00386068f5735d579f0f94b9af7.jpg" alt="" />
                        <span className='links-title disable-hover'>
                            Jhon Doe
                        </span>
                    </NavLink>


                </div>

            </div>
        </nav>
    );
}

export default SideNavBar;