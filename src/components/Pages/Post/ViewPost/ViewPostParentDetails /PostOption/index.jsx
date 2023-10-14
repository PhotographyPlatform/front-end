import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import { removePost } from '../../../../../../store/reducers/basicActions/post';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import ViewPost from '../..';
function PostOption({ postId, postOwnerId, onClose }) {

    const dispatch = useDispatch();
    const numEffect = useSelector((state) => state.post.numEffect);
    const userId = useSelector((state) => state.user.token.decoded.userId);

    // const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();

    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (postOwnerId === userId) {
            setAllow(true);
        }
    }, [postOwnerId, userId])

    function handleRemovepost() {
        dispatch(removePost(postId))
    }

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

                        {allow && (

                            <MenuItem style={{
                                padding: '2',
                                fontSize: '15px',
                            }} onClick={() => {
                                handleRemovepost();
                                onClose();
                            }} >
                                {/* <ViewPost isOpenViewPost={isOpenViewPost} onCloseViewPost={onClose} /> */}

                                <span>Remove</span>

                            </MenuItem>
                        )}
                    </MenuList>
                </>
            )
            }
        </Menu >
    );
}

export default PostOption;




