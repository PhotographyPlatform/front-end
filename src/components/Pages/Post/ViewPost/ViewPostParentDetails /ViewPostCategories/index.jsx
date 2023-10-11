import React from 'react';
import './viewPostCategories.scss'

function ViewPostCategories(props) {
    return (
        <ul className='category-container-viewpost'>
            {/* onClick={() => dispatch(setActiveCategory(category.name)) */}

            <li className='category-card'>nature</li>
            <li className='category-card'>Blcak & White</li>
            <li className='category-card'>Modern</li>

        </ul>


    );
}

export default ViewPostCategories;