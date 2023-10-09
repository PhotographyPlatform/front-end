import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { BiBookmarkHeart } from 'react-icons/bi';
import CommentSection from './CommentSection';
function ViewPostParentDetails() {
    return (
        <div className='viewpost-parent'>
            <div className='viewpost-img'>
                <img src="https://images.pexels.com/photos/14466513/pexels-photo-14466513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className='viewpost-details'>
                <section className='viewpost-section-details'>
                    <h3 className='viewpost-title'>
                        Gorgeous Image
                    </h3>
                    <p className='viewpost-description'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam voluptates ullam deserunt omnis, expedita et cumque, dolorem eos fuga rem quis voluptatibus veniam molestiae amet enim! Voluptas dolor incidunt cumque.
                    </p>
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
