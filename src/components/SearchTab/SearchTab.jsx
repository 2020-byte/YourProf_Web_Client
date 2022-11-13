import React, { useState } from 'react';
import styles from './SearchTab.module.css';

const SearchTab = ({info, handleClick}) => {

    const [curValue, setCurValue] = useState(info[0].value);
    
    const onClick = (e) => {

        
        const curItem = info.find(i => i.id == e.target.id);
        setCurValue(curItem.value);

        if(
            curItem.active == true
        ) return;

        console.log(e.target.id);
        handleClick && handleClick(e.target.id);
    }

    return (
        <ul className={styles.ulBox}>
            
            {
                info.map(i => (
                    <li
                    onClick={onClick} 
                    key={i.id}
                    id={i.id}
                    className={i.value === curValue? styles.clickedLiBox: styles.liBox}>
                        {i.numItem} {i.title}
                    </li>
                    
                ))
            }
        </ul>
    )
}

export default SearchTab;