import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import { removePost } from '../../../../../../store/reducers/basicActions/post';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import ViewPost from '../..';
import jwtDecode from "jwt-decode";
import cookies from 'react-cookies';
import Report from '../../../../../components/Report';

//onCloseNewPost, isOpenNewPost, actionId, actionType


function PostOption({ postId, postOwnerId, onClose }) {
    const { isOpen: isOpenReport, onOpen: onOpenReport, onClose: onCloseReport } = useDisclosure();

    const dispatch = useDispatch();
    const numEffect = useSelector((state) => state.post.numEffect);

    const session_user = cookies.load('user_session');
    let decoded = null;


    
    if (session_user) {
        decoded = jwtDecode(session_user);
    }
    // const userId = useSelector((state) => state.user?.token?.userId ?? 1);
    const userId = decoded.userId;



    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (userId) {
            if (postOwnerId === userId) {
                setAllow(true);
            }
        }

    }, [])

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
                        }} onClick={() => {
                            onOpenReport()
                        }}>Report
                            <Report onCloseReport={onCloseReport}
                                isOpenReport={isOpenReport} actionId={postId} actionType={'post'} />
                        </MenuItem>

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




