import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { removeComment } from '../../../../../../../store/reducers/basicActions/post';
import jwtDecode from "jwt-decode";
import cookies from 'react-cookies';
import Report from '../../../../../../components/Report';

import { useDisclosure } from '@chakra-ui/react';

function CommentOption({ item }) {
    const { isOpen: isOpenReport, onOpen: onOpenReport, onClose: onCloseReport } = useDisclosure();

    const [allow, setAllow] = useState(false);

    const commntsParent = item;
    const commentState = useSelector((state) => state.post.commentsList);
    // const userId = useSelector((state) => state.user.token.userId);
    const session_user = cookies.load('user_session');
    let decoded = null;

    if (session_user) {
        decoded = jwtDecode(session_user);
    }
    // const userId = useSelector((state) => state.user?.token?.userId ?? 1);
    const userId = decoded.userId;


    const dispatch = useDispatch()
    useEffect(() => {
        if (userId) {
            if (Array.isArray(commentState)) {
                if (commntsParent.owner.Id === userId) {
                    setAllow(true);
                }
            }
        }

    }, [commentState, userId]);

    const handleRemoveComment = () => {
        dispatch(removeComment(commntsParent.comment.id));
    };

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
                        }} onClick={() => {
                            onOpenReport()
                        }}>Report
                            <Report onCloseReport={onCloseReport}
                                isOpenReport={isOpenReport} actionId={commntsParent.comment.id} actionType={'comment'} />
                        </MenuItem>

                        {allow && (
                            <MenuItem style={{
                                fontSize: '12px',

                            }} onClick={handleRemoveComment}>
                                Remove</MenuItem>
                        )}
                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default CommentOption;




