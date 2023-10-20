import React, { useState, useEffect } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsInfoSquare } from 'react-icons/bs';
import { Follow, getFollowing, unFollow } from '../../../../../store/reducers/profile/profile.reducer';
import styles from './viewpostHeader.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const baseUrl = "http://localhost:3002";


function ViewPostHeader({ currentPost, currId }) {
    const userid = currentPost.postDetails[0] ? currentPost.postDetails[0].userid : null;
    const dispatch = useDispatch()
    const [follow, setFollow] = useState(false);
    const userFollowing = useSelector((state) => state.profile.following);
    const toggleFollow = () => {
        if (follow === true) {
            dispatch(unFollow(userid));
            // await dispatch(removeLike(postCurrentId))
        } else {
            dispatch(Follow(userid));
            // await dispatch(setLike(postCurrentId))

        }
        setFollow(!follow);
    };


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // dispatch(getProfile(userid));
        dispatch(getFollowing())
    }, [])

    useEffect(() => {
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
    }, [userid]);

    useEffect(() => {
        if (userFollowing !== undefined) {
            const found = userFollowing.Following.find(ele => ele.id === userid);
            if (found) {
                setFollow(true);
            } else {
                setFollow(false);
            }
        }
    }, [userFollowing]);

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
