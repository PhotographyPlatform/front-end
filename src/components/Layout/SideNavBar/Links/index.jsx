import React from 'react';
import { FaHome, FaUser, FaSearch, FaSign } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import "../style/navbar.scss"
import "../style/phone.scss"
import "../style/profile.scss"
import NavMenuList from '../MenuList.jsx';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

function NavSideLinks(props) {
    return (
        <div>
            <NavLink to='/' className='link-card hover-nav'>
                <div>
                    <FaHome />
                    <span className='links-title'>Home</span>
                </div>
            </NavLink>

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
        </div>
    );
}

export default NavSideLinks;