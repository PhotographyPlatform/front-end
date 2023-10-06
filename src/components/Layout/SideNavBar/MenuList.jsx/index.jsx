//  ⚠  Attention !!! ⚠

// This page is for editing the list on Mid and Large screens


import React from 'react';
import "./MenuList.scss"
import { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from '@chakra-ui/react';

import {
    HamburgerIcon, AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
} from '@chakra-ui/icons';


function NavMenuList(props) {
    const [isActive, setIsActive] = useState(false);

    const handleItemClick = () => {
        setIsActive(true);
    };

    return (<div className='menu-list-custom'>
        <Menu  >
            <MenuButton

                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon color='white' />}
                variant='outline'
                _hover={{ color: 'transparent' }}
                color={isActive ? '#333' : 'white'}
                borderColor='transparent'
                // color='white'
                fontWeight='bold'
            />
            <MenuList color={"#333"}
                minW='unset'
            >
                <MenuItem icon={<AddIcon />} command='⌘T'>
                    New Tab
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    New Window
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Open Closed Tab
                </MenuItem>
                <MenuItem icon={<EditIcon />} command='⌘O'>
                    Open File...
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
    );
}

export default NavMenuList;