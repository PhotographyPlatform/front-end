import React, { useState, useEffect } from 'react';
import { BiSolidLike, BiComment } from 'react-icons/bi';
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


    // favorite State
    const favoriteList = useSelector((state) => (state.Favorite && state.Favorite.favoritePosts) ? state.Favorite.favoritePosts : []);
    const postData = useSelector((state) => state.post);
    const likeList = postData.likeList;
    const [liked, setLiked] = useState(false);
    const [fav, setFav] = useState(false);

    useEffect(() => {
        if (Array.isArray(likeList)) {
            for (const item of likeList) {
                if (item.userid === userId) {
                    setLiked(true);
                    break;
                }
            }
        }
    }, [likeList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchFavoritePosts());
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();

    }, []);

    useEffect(() => {
        if (userId) {

            if (Array.isArray(favoriteList)) {
                for (const item of favoriteList) {
                    if (item && item.userid === userId && postCurrentId === item.id) {
                        setFav(true);
                        break;
                    }
                }
            }
        }

    }, [favoriteList]);



    const dispatch = useDispatch();
    // Like Comment button State
    const [isActive, setIsActive] = useState(false);
    const handleCommentClick = () => {
        setIsActive(true);
        dispatch(handleCommentActive());
    };




    // Get user id from Session 
    const session_user = cookies.load('user_session');
    let decoded = null;
    let userId = null
    if (session_user) {
        decoded = jwtDecode(session_user);
        userId = decoded.userId
    }



    const postCurrentId = postData.postDetails.length > 0 ? postData.postDetails[0].id : null;




    // Like Toggle 
    const toggleLike = async () => {
        if (liked === true) {
            await dispatch(removeLike(postCurrentId))
        } else {
            await dispatch(setLike(postCurrentId))

        }
        setLiked(!liked);
    };

    // Faviorites  Toggle
    const toggleFav = async () => {
        if (fav === true) {
            await dispatch(removeFavorite(postCurrentId))

        } else {
            await dispatch(addFavoritePost(postCurrentId))

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
                    <span>
                        {likeList.length > 0 && likeList.length}
                    </span>
                </div>

                <div
                    className={`action-button comment-button ${isActive ? 'active' : ''}`}
                    onClick={handleCommentClick}
                >
                    <BiComment size={22} />
                </div>
                <div className="bookmark-button , action-button" onClick={toggleFav}>
                    {fav ? <BsFillBookmarkCheckFill size={22} /> : <BsBookmark size={22} />}

                </div>
            </div>
        </>
    );
}

export default ActionSection;