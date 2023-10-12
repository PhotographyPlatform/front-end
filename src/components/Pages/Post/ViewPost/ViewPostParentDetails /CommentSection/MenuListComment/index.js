import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";

function CommentOption() {
    return (
        <Menu style={{
            width: '50px !important',
            // height: '300px', 
        }}>
            {({ isOpen }) => (
                <>
                    <MenuButton as={Button} rightIcon={<GrMoreVertical />} style={{
                        background: 'none',
                        padding: '1',
                    }}>
                        {/* {isOpen ? 'Close' : 'Open'} */}

                    </MenuButton>
                    <MenuList style={{
                        width: '30px !important'
                    }}>
                        <MenuItem style={{
                            fontSize: '12px',
                            padding: '2',
                        }}>Report</MenuItem>

                        <MenuItem style={{
                            fontSize: '12px',
                        }}>Remove</MenuItem>

                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default CommentOption;




