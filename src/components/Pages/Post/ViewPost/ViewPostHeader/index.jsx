import React, { useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsInfoSquare } from 'react-icons/bs';
import styles from './viewpostHeader.module.scss';


function ViewPostHeader() {
    const [follow, setFollow] = useState(false);

    const toggleFollow = () => {
        if (follow === true) {
            // await dispatch(removeLike(postCurrentId))
        } else {
            // await dispatch(setLike(postCurrentId))

        }
        setFollow(!follow);
    };


    return (
        <header className={styles['viewpost-header']}>
            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className={styles['viewpost-img-postowner']} />
            <span className={styles['viewpost-username-postowner']}> Abd- Al Majeed </span>
            {/* <AiOutlinePlusSquare size={36} /> */}
            <span className={styles['svg']} onClick={() => toggleFollow()} >

                {follow ? 'Following' : 'Follow'}

            </span>
        </header>
    );
}

export default ViewPostHeader;
