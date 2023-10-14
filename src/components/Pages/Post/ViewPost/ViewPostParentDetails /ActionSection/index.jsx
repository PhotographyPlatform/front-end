import React, { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { BiBookmarkHeart, BiLike } from 'react-icons/bi';
import { GrMoreVertical } from 'react-icons/gr';
import './actionSection.scss'
// import { TfiComment } from 'tficomment';
import { useSelector, useDispatch } from 'react-redux';
import { setLike, removeLike } from '../../../../../../store/reducers/basicActions/post';
import { handleCommentActive } from '../../../../../../store/reducers/basicActions/post';

function ActionSection(props) {
    // Like Button State
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    // Like Comment button State
    const [isActive, setIsActive] = useState(false);
    const handleCommentClick = () => {
        setIsActive(true);
        dispatch(handleCommentActive());
    };


    const postData = useSelector((state) => state.post);
    const likeList = postData.likeList
    const userId = useSelector((state) => state.user.token.decoded.userId);

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
    }, [likeList, userId, postCurrentId]);




    const toggleLike = async () => {
        if (liked === true) {
            await dispatch(removeLike(postCurrentId))
        } else {
            await dispatch(setLike(postCurrentId))

        }
        setLiked(!liked);
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
                <div className="bookmark-button , action-button">
                    <BiBookmarkHeart size={22} />
                </div>
            </div>
        </>
    );
}

export default ActionSection;