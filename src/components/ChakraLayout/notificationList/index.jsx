import React, { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdPhotos } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { RiUserFollowLine } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import {
    FiBell,
} from 'react-icons/fi';

import './notifiList.scss'
import ViewPost from "../../Pages/Post/ViewPost";
import { setRead } from "../../../store/reducers/notificationAction";

function NotifiList() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();

    const [active, setActive] = useState(false);

    const dispatch = useDispatch()
    const notifiOld = useSelector((state) => state.notification.old)
    const notifiNew = useSelector((state) => state.notification.new)
    const notifiRead = useSelector((state) => state.notification.read)

    // handle read 


    const oldNotifications = notifiOld.length > 0 ? (
        notifiOld.map((notification, index) => {
            return (
                <li key={index} onClick={onOpenViewPost}>
                    {/* <ViewPost
                        isOpenViewPost={isOpenViewPost}
                        onCloseViewPost={onCloseViewPost}
                        id={ notification.actionParentId }
                    /> */}

                    {getNotificationIcon(notification.message)}
                    <div>{notification.message}</div>
                    <span>{calculateTimeDifference(notification.createdAt)}</span>
                </li>
            );
        })
    ) : (
        <div> Notifications are empty</div>
    );


    const newNotifications = notifiNew.length > 0 ? (

        notifiNew.map((notification, index) => {
            dispatch(setRead(false));
            return (
                <li className='notifi-new' key={index} >
                    {/*                     //onClick={onOpenViewPost} */}
                    {/* <ViewPost
                        isOpenViewPost={isOpenViewPost}
                        onCloseViewPost={onCloseViewPost}
                        id={notification.actionParentId}
                    /> */}

                    {getNotificationIcon(notification.message)}
                    <div>{notification.message}</div>
                    <span>{calculateTimeDifference(notification.createdAt)}</span>
                </li>
            )
        })
    ) : (

        <div> </div>
    );

    const handleMenuOpen = () => {
        // if (!menuOpenedOnce) {
        //     setMenuOpenedOnce(true); // Set the flag to true on first open
        // }
        dispatch(setRead(true));

    };
    // dispatch(setRead(true));
    console.log("REEEEED", notifiRead)
    return (
        <Menu>
            <div className="notifi-icon" onClick={() => {
                handleMenuOpen();
                onOpen();
            }}>
                <span className={`notifi-span ${notifiRead ? 'notifi-none' : 'notifi-red'}`}></span>


                <MenuButton as={IconButton} aria-label="Options" icon={<FiBell size={25} />} variant="outline" />
            </div>
            <MenuList isOpen={isOpen} onClose={onClose} >

                <section className="notifi-parent ">
                    <h5>Notifcations <FiBell className="rotate-icon" /></h5>
                    <hr />



                    <div className="notifi-scroll">
                        <ul >
                            {newNotifications}
                            {Array.isArray(oldNotifications) ? oldNotifications.reverse() : oldNotifications}

                            {/* <li>   <FaRegComment /><div><b>moh</b > add comment on your post</div>  <span>4Y </span></li>
                            <li> <RiUserFollowLine />   <div><b>moh</b > followed you</div>    <span>4M </span>  </li>
                            <li> <IoMdPhotos /><div> <b>moh</b > added new photo</div><span>2D </span> </li>
                            <li><BiLike /><div><b>moh</b > liked your post</div> <span>2h </span> </li> */}
                        </ul>
                    </div>
                </section>
            </MenuList>
        </Menu>
    );
}




function getNotificationIcon(message) {
    let words
    let action
    if (message) {
        words = message.split(" ");
        words.shift();
        action = words.join(" ");
    }

    switch (action) {
        case "followed you":
            return <RiUserFollowLine />;
        case "liked your post":
            return <BiLike />;
        case "Add comment on your post":
            return <FaRegComment />;
        default:
            return null;
    }
}

function calculateTimeDifference(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;

    const minuteInMs = 60 * 1000;
    const hourInMs = 60 * minuteInMs;
    const dayInMs = 24 * hourInMs;
    const weekInMs = 7 * dayInMs;
    const yearInMs = 365 * dayInMs;

    if (timeDifference < minuteInMs) {
        const seconds = Math.floor(timeDifference / 1000);
        return `JustNow`;
    } else if (timeDifference < hourInMs) {
        const minutes = Math.floor(timeDifference / minuteInMs);
        return `${minutes}m`;

    } else if (timeDifference < dayInMs) {
        const hours = Math.floor(timeDifference / hourInMs);
        return `${hours}h`;

    } else if (timeDifference < weekInMs) {
        const days = Math.floor(timeDifference / dayInMs);
        return `${days}d`;

    } else if (timeDifference < yearInMs) {
        const weeks = Math.floor(timeDifference / weekInMs);
        return `${weeks}w`;

    } else {
        const years = Math.floor(timeDifference / yearInMs);
        return `${years}y`;
    }
}


export default NotifiList;
