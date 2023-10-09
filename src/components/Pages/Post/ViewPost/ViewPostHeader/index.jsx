import React from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsInfoSquare } from 'react-icons/bs';
import styles from './viewpostHeader.module.scss';

function ViewPostHeader() {
    return (
        <header className={styles['viewpost-header']}>
            <img src="https://scontent.famm3-2.fna.fbcdn.net/v/t39.30808-6/342214291_1233319827304390_5132855252943600000_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeE3PKT6jUkmZI6sdDEbz0Gz78vhUaZAlBTvy-FRpkCUFMJrxhk0-gqcwLtmHdUDRRCWv40qK9HNk2SsYL__qY38&_nc_ohc=DrmhaVwazJcAX_9kzDE&_nc_zt=23&_nc_ht=scontent.famm3-2.fna&oh=00_AfDxV6fXldL6Tf1hXywLWCJFJGTuvsCObbIUU40p_vh0rw&oe=65279339" alt="" className={styles['viewpost-img-postowner']} />
            <span className={styles['viewpost-username-postowner']}> Abd- Al Majeed </span>
            <div className={styles['viewpost-header-icons']}>
                <AiOutlinePlusSquare size={36} />
                <BsInfoSquare size={30} />
            </div>
        </header>
    );
}

export default ViewPostHeader;
