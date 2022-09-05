import React from 'react';
import styles from './RatingTabs.module.css';

const RatingTabs = ({numRating}) => {

    return (
        <ul className={styles.ulBox}>
            <li className={styles.liBox}>{numRating} Student Ratings</li>
        </ul>
    )
}

export default RatingTabs;