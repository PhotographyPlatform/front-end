import React from 'react';
import { IconButton, HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

function notificationList() {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <MenuList>
                <CustomMenuItem icon={<AddIcon />} command='⌘T'>
                    New Tab
                </CustomMenuItem>
                <CustomMenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    New Window
                </CustomMenuItem>
                <CustomMenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Open Closed Tab
                </CustomMenuItem>
                <CustomMenuItem icon={<EditIcon />} command='⌘O'>
                    Open File...
                </CustomMenuItem>
            </MenuList>
        </Menu>
    );
}

function CustomMenuItem({ icon, command, children }) {
    return (
        <MenuItem icon={icon} command={command}>
            {children}
        </MenuItem>
    );
}

export default notificationList;
