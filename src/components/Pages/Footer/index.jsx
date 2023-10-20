import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss'
function MainFooter(props) {
    return (
        <div className='main-footer'>
            {/* <p className='links'>
                <Link> Privacy</Link>
            </p> */}
            <p className='copy'>
                &copy; 2023 Pixle Time
            </p>

            {/* <p className='links'>
                <Link> Privacy</Link>
            </p> */}

        </div>
    );
}

export default MainFooter;