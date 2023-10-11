import React from 'react';
import SideNavBar from './SideNavBar';
import './LayoutBody.scss';

function Layout({ children }) {
    return (
        <div className='custome-layout'>

            <div className='side-nav-layout'>
                <SideNavBar />
            </div>

            <div className='children-layout'>
                {/* <div className='children-scrollable'> */}
                    {children}
                {/* </div> */}
            </div>
            

        </div>
    );
}

export default Layout;
