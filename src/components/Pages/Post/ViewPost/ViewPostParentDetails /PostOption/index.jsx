import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";

function PostOption() {
    return (
        <Menu style={{
            // width: '50px !important',
            // height: '300px', 
        }}>
            {({ isOpen }) => (
                <>
                    <MenuButton as={Button} rightIcon={<GrMoreVertical style={{ fontSize: '24px' }} />} style={{
                        background: 'none',
                        padding: '0',
                    }}>
                        {/* {isOpen ? 'Close' : 'Open'} */}

                    </MenuButton>
                    <MenuList style={{
                        width: '30px !important'
                    }}>
                        <MenuItem style={{
                            fontSize: '15px',
                            padding: '2',
                        }}>Report</MenuItem>

                        <MenuItem style={{
                            padding: '2',
                            fontSize: '15px',
                        }}>Remove</MenuItem>

                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default PostOption;




