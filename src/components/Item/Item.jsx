import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
import {Stack} from 'react-bootstrap';
import  {FaRegBookmark} from 'react-icons/fa';
import styles from './Item.module.css';

const chooseQualityColor = (itemQuality) => {
    if(itemQuality < 0) return "lightgrey"
    if (itemQuality >= 4) return 'rgb(127, 246, 195)';
    if (itemQuality < 4 && itemQuality >= 3) return 'rgb(255, 241, 112)';
    return 'rgb(255, 156, 156)';
}


const Item = ({item}) => {

    const qualityColor = chooseQualityColor(item.quality)

    return (
        <div className={styles.box}>
            <Stack className={styles.qualityInfo} >
                <div style={{fontWeight: 'bolder', color:'rgba(0, 0, 0)'}}>
                    QUALITY
                </div>
                <div className={styles.qualityBox} style={{backgroundColor : `${qualityColor}`}}>
                    <div className={styles.quality}>
                        {item.quality < 0? "N/A": item.quality.toFixed(1)}
                    </div>
                </div>
                <div>
                    {item.ratings} ratings
                </div>
            </Stack>
            <Stack gap={2} className={styles.info}>
                <div className={styles.name}>
                    {item.name}
                </div>
                <div>
                    {item.department}
                </div>
                <div>
                    <span className={styles.WTA}>
                        <span style={{fontWeight: 'bolder', color:'rgba(0, 0, 0)'}} >{item.WTA} </span> 
                        would take again
                    </span>
                    <span className={styles.verticalLine}> | </span>
                    <span className={styles.LOD}>
                        <span style={{fontWeight: 'bolder', color:'rgba(0, 0, 0)'}}>
                            {item.LOD < 0 ? "N/A": item.LOD} </span> 
                        level of difficulty
                    </span>
                </div>
            </Stack>
            <FaRegBookmark className={styles.bookmark}/>
        </div>
    )
}

export default Item;