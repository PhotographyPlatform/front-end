import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../../store/reducers/auth/user.reducer';
import React, { useState } from 'react';
import './MenuList.scss';
import { BiLogOut, BiCog } from 'react-icons/bi';

function NavMenuList(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const handleLogout = () => {
        // Dispatch the logOut action to log the user out
        dispatch(logOut());

        // Navigate to the "/signin" route after logging out
        navigate('/signin');
    };

    const handleItemClick = () => {
        setIsActive(true);
    };

    return (
        <div className='menu-list-custom'>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon color={isActive ? 'black' : 'white'} />}
                    variant='outline'
                    _hover={{ color: 'transparent' }}
                    color={isActive ? '#333' : 'white'}
                    borderColor='transparent'
                    fontWeight='bold'
                />
                <MenuList color={isActive ? 'black' : '#333'}   >

                    <MenuItem >
                        <BiCog style={{ marginRight: '8px' }} /> Settings
                    </MenuItem>
                    <MenuItem onClick={onOpen}>
                        <BiLogOut style={{ marginRight: '8px' }} />

                        <div onClick={onOpen}>Log Out</div>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalBody>Are You Sure To Logout?</ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={handleLogout}>
                                        Logout
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}

export default NavMenuList;
