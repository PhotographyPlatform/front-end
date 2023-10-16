import React, { useEffect } from 'react';
import CommentSection from './CommentSection';
import ActionSection from './ActionSection';
import ViewPostCategories from './ViewPostCategories';
import PostOption from './PostOption';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostData } from '../../../../../store/reducers/basicActions/post';
import './detailsPost.scss'
import { DecodeToken } from '../../../../../store/reducers/auth/user.reducer';


function ViewPostParentDetails({ post, onClose }) {
    console.log("CurrenttPOST", post.curre)
    const postDetails = useSelector((state) => state.post.postDetails);
    
    const { id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt, } = postDetails[0];

    return (
        <div className='viewpost-parent-details'>
            <div className='viewpost-img'>
                <img src="https://images.pexels.com/photos/2760519/pexels-photo-2760519.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </div>
            <div className='viewpost-details'>
                <section className='viewpost-section-details'>

                    <div className='viewpost-title'>
                        <h3>{title}</h3>
                        <div className='viewpost-icon-details'>
                            <PostOption postId={id} postOwnerId={userid} onClose={onClose} />
                        </div>
                    </div>
                    <p className='viewpost-description'>
                        {contant}
                    </p>

                    <div className='viewpost-category'>
                        <ViewPostCategories category={category} onClose={onClose} />
                    </div>
                    <div className='viewpost-basic-actions' >

                        <ActionSection photoId={id} />

                    </div>
                </section>
                <section>
                    <CommentSection photoId={id} />
                </section>
            </div>
        </div>
    );
}

export default ViewPostParentDetails;
