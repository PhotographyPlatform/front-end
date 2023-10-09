import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { BiBookmarkHeart } from 'react-icons/bi';
import CommentSection from './CommentSection';
import { GrMoreVertical } from 'react-icons/gr';
import ViewPostCategories from './ViewPostCategories';
import './detailsPost.scss'
function ViewPostParentDetails() {
    return (
        <div className='viewpost-parent-details'>
            <div className='viewpost-img'>
                <img src="https://images.pexels.com/photos/9353471/pexels-photo-9353471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className='viewpost-details'>
                <section className='viewpost-section-details'>

                    <div className='viewpost-title'>
                        <h3>Gorgeous Image</h3>
                        <div className='viewpost-icon-details'>
                            <GrMoreVertical size={30} />
                        </div>
                    </div>
                    <p className='viewpost-description'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam voluptates ullam deserunt omnis, expedita et cumque, dolorem eos fuga rem quis voluptatibus veniam molestiae amet enim! Voluptas dolor incidunt cumque.
                    </p>

                    <div className='viewpost-category'>
                        <ViewPostCategories />
                    </div> 
                    <div className='viewpost-basic-actions'>
                        <BiSolidLike size={32} />
                        <FaRegComment size={32} />
                        <BiBookmarkHeart size={32} />
                    </div>
                </section>
                <section>
                    <CommentSection />
                </section>
            </div>
        </div>
    );
}

export default ViewPostParentDetails;
