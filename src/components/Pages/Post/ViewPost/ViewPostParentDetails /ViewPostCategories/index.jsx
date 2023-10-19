import React from 'react';
import './viewPostCategories.scss'
import { setActiveCategory } from '../../../../../../store/reducers/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
function ViewPostCategories({ category, onClose }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleClick() {

        onClose();
    }


    return (
        <ul className='category-container-viewpost'>
            {/* onClick={() => dispatch(setActiveCategory(category.name)) */}

            {
                category&&
                category.map((category, index) => (
                <span className='category-card' onClick={() => { navigate('/search'); dispatch(setActiveCategory(category)); handleClick(); }} >
                    {/* < Link to="/search" key={index}> */}
                    {category}

                    {/* </Link> */}

                </span>

            ))
            }
        </ul >

        //      onClick = {() => {
        //     handleRemovepost();
        //     onClose();
        // }



    );
}

export default ViewPostCategories;