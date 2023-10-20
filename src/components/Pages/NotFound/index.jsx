// import React from 'react';
// import { Link } from 'react-router-dom';
// import './notfound.scss'
// function NotFound() {
//     return (
//         <div className="parent-not-found">
//             <div className="not-found">
//                 <h2>404 - Not Found</h2>
//                 <p>The page you are looking for does not exist.</p>
//                 <p className='link'><Link to="/">Back To Home page</Link></p>

//             </div>
//         </div>
//     );
// }

// export default NotFound;

import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.scss';
import MainFooter from '../Footer';

function NotFound() {
    return (
        <div>
            <div className="parent-not-found">
                <div className="not-found">
                    <h2 className="not-found-title">404 - Not Found</h2>
                    <p className="not-found-text">The page you are looking for does not exist.</p>
                    <p className="not-found-link">
                        <Link to="/" className="home-link">Back To Home Page</Link>
                    </p>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}

export default NotFound;

