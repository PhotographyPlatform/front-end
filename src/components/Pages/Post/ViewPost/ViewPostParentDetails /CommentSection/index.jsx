import React, { useEffect, useState, useRef } from 'react';
import './comments.scss'
import { GrMoreVertical } from 'react-icons/gr';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CommentOption from './MenuListComment';
import { useSelector, useDispatch } from 'react-redux';
import {
    setComment, fetchComments, fetchPostData, handleCommentActive
} from '../../../../../../store/reducers/basicActions/post';


function CommentSection(postId) {
    const commentState = useSelector((state) => state.post.commentsList);
    const inputActive = useSelector((state) => state.post.commentActive);
    //setComment
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputActive) {
            // Check if inputActive is true, and if so, focus on the input element
            inputRef.current.focus();

            // You can also scroll to the input element if needed
            inputRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [inputActive]);

    const handleCommentSubmit = async () => {
        try {
            const obj = {
                "postid": postId.photoId,
                "contant": commentText
            }
            await dispatch(setComment(obj));
            setCommentText('');
            dispatch(handleCommentActive());
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (

        <div>
            <ul className='viewpost-comment-list'>
                {Array.isArray(commentState) && commentState.length > 0 ? (
                    commentState.map((item) => (
                        <div className='comments-card' key={item.id}>
                            <div className='owner'>
                                <div className='details'>
                                    <img src={item.owner.img} alt="" />
                                    <span>{item.owner.username}</span>
                                </div>
                                <CommentOption item={item} />
                            </div>
                            <div className='comment-content'>
                                <span>{item.comment.content}</span>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <div className='no-comments'>No comments available</div>
                )}

            </ul>

            <div className='comment-input'>
                <input
                    type="text"
                    placeholder="Type your comment here..."
                    value={commentText}
                    ref={inputRef}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleCommentSubmit}> <AiOutlineArrowRight /> </button>
            </div>

        </div>
    );
}

export default CommentSection;
