import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdPhotos } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { RiUserFollowLine } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import { FiBell, } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'
import './notifiList.scss'
import ViewPost from "../../Pages/Post/ViewPost";
import { setRead } from "../../../store/reducers/notificationAction";
import cookies from 'react-cookies'
import { compileString } from "sass";
function NotifiList() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isOpen: isOpenViewPost, onOpen: onOpenViewPost, onClose: onCloseViewPost } = useDisclosure();

    const [active, setActive] = useState(true);
    const [newStateNotifi, setNewStateNotifi] = useState([]);
    const [oldStateNotifi, setoldStateNotifi] = useState([]);

    const navigate = useNavigate()
    function handleProfile(id) {
        cookies.remove('id');
        cookies.save('id', id);
        navigate('/userProfile')
    }

    const dispatch = useDispatch()


    const notifiOld = useSelector((state) => state.notification.old)
    const notifiNew = useSelector((state) => state.notification.new)
    const notifiRead = useSelector((state) => state.notification.read)

    const toggleItemNew = (item) => {
        if (Array.isArray(newStateNotifi)) {
            const itemExists = newStateNotifi.some((existingItem) => existingItem.id === item.id);
            if (!itemExists) {

                const filter = newStateNotifi.filter((item) => item.id !== item.id);
                setNewStateNotifi(filter)
                let updatedState = [...newStateNotifi, item];
                updatedState = updatedState.reverse();
                setNewStateNotifi(updatedState);

            } else {
            }
        } else {
            // setNewStateNotifi(item);

        }

    };

    useEffect(() => {
        toggleItemNew(notifiNew);
    }, [notifiNew])

    // useEffect(() => {
    //     toggleItem(notifiNew);
    // }, [notifiNew])








    // handle read 
    const oldNotifications = notifiOld.length > 1 ? (
        notifiOld.map((notification, index) => {
            if (notification.id) {
                if (notification.actionType !== 'follow') {
                    return (
                        <li key={index} onClick={onOpenViewPost}>
                            {/* onClick={onOpenViewPost} */}
                            {/* <ViewPost
                                isOpenViewPost={isOpenViewPost}
                                onCloseViewPost={onCloseViewPost}
                                id={notification.actionParentId}
                            /> */}
                            {getNotificationIcon(notification.message)}
                            <div>{notification.message}</div>
                            <span>{calculateTimeDifference(notification.createdAt)}</span>

                        </li>
                    );

                } else {
                    return (
                        <li key={index} onClick={() => { handleProfile(notification.actionParentId) }} >
                            {/* onClick = { navigate('/profile') } */}
                            {getNotificationIcon(notification.message)}
                            <div>{notification.message}</div>
                            <span>{calculateTimeDifference(notification.createdAt)}</span>
                        </li>
                    )
                }
            } else {
                // return <div className="notifi-empty">Notifications are empty</div>; // Added "return" here
            }
        })
    ) : (
        <div className="notifi-empty">
            <FiBell size={100} />

            <div className="notifi-empty-p">
                <h4>Stay tuned for notifications  here! </h4>
                Explore the platform and connect with amazing users
            </div>
        </div> // Handle the case when notifiOld is empty
    );

    // New Notifications -----

    const newNotifications = newStateNotifi.length > 0 ? (
        newStateNotifi.map((notification, index) => {
            if (notification.id) {
                dispatch(setRead(false));
                if (notification.actionType !== 'follow') {
                    return (
                        <li key={index} onClick={onOpenViewPost} className={" notifi-new"}>
                            {/* <ViewPost
                                isOpenViewPost={isOpenViewPost}
                                onCloseViewPost={onCloseViewPost}
                                id={notification.actionParentId}
                            /> */}
                            {getNotificationIcon(notification.message)}
                            <div>{notification.message}</div>
                            <span>{calculateTimeDifference(notification.createdAt)}</span>
                        </li>
                    );
                } else {
                    return (
                        <li key={index} onClick={() => { handleProfile(notification.actionParentId) }} className={" notifi-new"}>
                            {getNotificationIcon(notification.message)}
                            <div>{notification.message}</div>
                            <span>{calculateTimeDifference(notification.createdAt)}</span>
                        </li>
                    );
                }
            } else if (notification.actionType === 'follow') {
                return (
                    <li className='notifi-new' key={index} onClick={onOpenViewPost}>
                        {/* <ViewPost
                            isOpenViewPost={isOpenViewPost}
                            onCloseViewPost={onCloseViewPost}
                            id={notification.actionParentId}
                        /> */}
                        {getNotificationIcon(notification.message)}
                        <div>{notification.message}</div>
                        <span>{calculateTimeDifference(notification.createdAt)}</span>
                    </li>
                );
            }

        })
    ) : (
        <div></div>
    );

    const handleMenuOpen = () => {
        // if (!menuOpenedOnce) {
        //     setMenuOpenedOnce(true); // Set the flag to true on first open
        // }
        dispatch(setRead(true));

    };
    // dispatch(setRead(true));
    return (

        <Menu className={"notifi"}>

            <div className="notifi-icon" onClick={() => {
                handleMenuOpen();
                onOpen();
            }}>
                <span className={`notifi-span ${notifiRead ? 'notifi-none' : 'notifi-red'}`}></span>


                <MenuButton as={IconButton} aria-label="Options" icon={<FiBell size={25} />} variant="outline" />
            </div>
            <MenuList isOpen={isOpen} onClose={onClose} className={"notifi"}>

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
        case "added new post":
            return <IoMdPhotos />;
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
