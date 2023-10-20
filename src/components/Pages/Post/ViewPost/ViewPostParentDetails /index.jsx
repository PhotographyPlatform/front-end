import React, { useEffect, useState } from 'react';
import CommentSection from './CommentSection';
import ActionSection from './ActionSection';
import ViewPostCategories from './ViewPostCategories';
import PostOption from './PostOption';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostData } from '../../../../../store/reducers/basicActions/post';
import './detailsPost.scss'
import { DecodeToken } from '../../../../../store/reducers/auth/user.reducer';
import CalculateTime from '../../../../components/Time';
import SkeletonComments from './SkeletonComments';

function ViewPostParentDetails({ post, onClose, currId }) {
    const postDetails = useSelector((state) => state.post.postDetails || []);
    const loading = useSelector((state) => state.post.loading);

    const [postDetailsData, setPostDetailsData] = useState(null);

    const dispatch = useDispatch();
    const numEffect = useSelector((state) => state.post.numEffect);

    useEffect(() => {
        if (postDetails) {
            const { id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt, } = postDetails;
            setPostDetailsData({
                id,
                imgurl,
                userid,
                title,
                contant,
                challengeName,
                challengeID,
                category,
                createdAt,
                updatedAt,
            });
        }
    }, [postDetails])

    const { id, imgurl, userid, title, contant, challengeName, challengeID, category, createdAt, updatedAt } = post.postDetails[0] || {};

    useEffect(() => {

        const fetchData = async () => {
            try {
                await dispatch(fetchPostData(currId));
            } catch (error) {
                // Handle the error here
            }
        };
        fetchData();

    }, [numEffect]);






    return (
        <div className='viewpost-parent-details'>
            <div className='viewpost-img'>
                <img src={imgurl} alt="" />
            </div>
            <div className='viewpost-details'>
                <section className='viewpost-section-details'>

                    <div className='viewpost-title'>
                        <h3 className='main-title'> <div>{title} </div><span className='post-time'> <CalculateTime createdAt={createdAt} /></span> </h3>
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
                <section className='comments-section'>
                    {loading ? (
                        <SkeletonComments />
                    ) : (
                        <CommentSection photoId={id} />
                    )}
                </section>

            </div>
        </div>
    );
}

export default ViewPostParentDetails;
