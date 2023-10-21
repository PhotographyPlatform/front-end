import React, { useState, useEffect } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsInfoSquare } from 'react-icons/bs';
import styles from './viewpostHeader.module.scss';
import axios from 'axios';
const baseUrl = "http://localhost:3002";


function ViewPostHeader({ currentPost, currId }) {
    const userid = currentPost.postDetails[0] ? currentPost.postDetails[0].userid : null;

    const [follow, setFollow] = useState(false);

    const toggleFollow = () => {
        if (follow === true) {
            // await dispatch(removeLike(postCurrentId))
        } else {
            // await dispatch(setLike(postCurrentId))

        }
        setFollow(!follow);
    };





    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (userid) {
            axios.get(`${baseUrl}/v1/newUserCOll/${userid}`)
                .then(response => {

                    setData(response.data.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
            return () => {

            };
        }
      
    }, [userid]);



    return (
        <header className={styles['viewpost-header']}>
            <img src={data.img} alt="" className={styles['viewpost-img-postowner']} />
            <span className={styles['viewpost-username-postowner']}> {data.username}</span>
            {/* <AiOutlinePlusSquare size={36} /> */}
            <span className={`${styles['svg']} ${follow ? styles['following'] : styles['follow']}`} onClick={() => toggleFollow()}>
                {follow ? 'Following' : 'Follow'}
            </span>
        </header >
    );
}

export default ViewPostHeader;
