import React, { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { BiBookmarkHeart, BiLike } from 'react-icons/bi';
import { BsBookmark, BsFillBookmarkCheckFill } from 'react-icons/bs';

import { GrMoreVertical } from 'react-icons/gr';
import './actionSection.scss'
// import { TfiComment } from 'tficomment';
import { useSelector, useDispatch } from 'react-redux';
import { setLike, removeLike } from '../../../../../../store/reducers/basicActions/post';
import { handleCommentActive } from '../../../../../../store/reducers/basicActions/post';
import { addFavoritePost, removeFavorite, fetchFavoritePosts } from '../../../../../../store/reducers/favorite/favorite';
import jwtDecode from "jwt-decode";
import cookies from 'react-cookies';

function ActionSection(photoId) {
    // Like Button State
    const [liked, setLiked] = useState(false);
    const [fav, setFav] = useState(false);
    const dispatch = useDispatch();

    // Like Comment button State
    const [isActive, setIsActive] = useState(false);
    const handleCommentClick = () => {
        setIsActive(true);
        dispatch(handleCommentActive());
    };


    const postData = useSelector((state) => state.post);
    const likeList = postData.likeList

    // Get user id from Session 
    const session_user = cookies.load('user_session');
    let decoded = null;

    if (session_user) {
        decoded = jwtDecode(session_user);
    }

    const userId = decoded.userId;

    const postCurrentId = postData.postDetails.length > 0 ? postData.postDetails[0].id : null;



    // Search  if the user already add like
    useEffect(() => {


        if (Array.isArray(likeList)) {
            for (const item of likeList) {
                if (item.userid === userId) {
                    setLiked(true);
                    break;
                }
            }
        }


    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchFavoritePosts(session_user));
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();

    }, []);

    const favoriteList = useSelector((state) => state.Favorite.favoritePosts
    );

    useEffect(() => {
        if (userId) {

            if (Array.isArray(favoriteList)) {
                for (const item of favoriteList) {
                    if (item.userid === userId && postCurrentId === item.id) {
                        console.log(true)
                        setFav(true);
                        break;
                    }
                }
            }
        }

    }, []);




    const toggleLike = async () => {
        if (liked === true) {
            await dispatch(removeLike(postCurrentId))
        } else {
            await dispatch(setLike(postCurrentId))

        }
        setLiked(!liked);
    };
    // Faviorites 

    const toggleFav = async () => {
        if (liked === true) {
            await dispatch(removeFavorite(session_user, postCurrentId))

        } else {
            await dispatch(addFavoritePost(session_user, postCurrentId))

        }
        setFav(!fav);
    };

    return (
        <>
            <hr />

            <div className={`action-icon ${liked ? 'liked' : ''}`}>

                <div className="like-button action-button" onClick={toggleLike} >
                    <div>
                        {liked ? <BiSolidLike size={22} /> : <BiLike size={22} />}

                    </div>
                    <span>{likeList.length}</span>
                </div>

                <div
                    className={`action-button comment-button ${isActive ? 'active' : ''}`}
                    onClick={handleCommentClick}
                >
                    <FaRegComment size={22} />
                </div>
                <div className="bookmark-button , action-button" onClick={toggleFav}>
                    {fav ? <BsFillBookmarkCheckFill size={22} /> : <BsBookmark size={22} />}

                </div>
            </div>
        </>
    );
}

export default ActionSection;