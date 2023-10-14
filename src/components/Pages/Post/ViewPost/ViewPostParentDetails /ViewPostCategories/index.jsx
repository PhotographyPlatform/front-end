import React from 'react';
import './viewPostCategories.scss'
// import 

function ViewPostCategories(props) {
    console.log('Category Components', props)
    console.log(props)
    return (
        <ul className='category-container-viewpost'>
            {/* onClick={() => dispatch(setActiveCategory(category.name)) */}

            {props.category.map((category, index) => (
                <li key={index} className='category-card' >
                    {category}
                </li>
            ))}
        </ul>


    );
}

export default ViewPostCategories;