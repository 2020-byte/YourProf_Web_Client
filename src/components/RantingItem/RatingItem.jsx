import React from 'react';
import styles from './RatingItem.module.css';

const RatingItem = ({item}) => {

    return (
        <div>{JSON.stringify(item)}</div>
    )
}

export default RatingItem;