import React from 'react';
import './comments.scss'
import { GrMoreVertical } from 'react-icons/gr';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CommentOption from './MenuListComment';
function CommentSection() {
    return (
        <div>
            <ul className='viewpost-comment-list'>

                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <hr />
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>
                <div className='comments-card'>
                    <div className='owner'>
                        <div className='details' >
                            <img src="https://images.pexels.com/photos/16128264/pexels-photo-16128264/free-photo-of-snow-and-clouds-around-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>mohAttallah</span>
                        </div>
                        <CommentOption />
                    </div>
                    <div className='comment-content'>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                </div>

            </ul >


            <div className='comment-input'>
                <input type="text" placeholder="Type your comment here..." />
                <button> <AiOutlineArrowRight /> </button>
            </div>

        </div>
    );
}

export default CommentSection;
