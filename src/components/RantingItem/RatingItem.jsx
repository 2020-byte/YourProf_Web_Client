import React from 'react';
import { Stack } from 'react-bootstrap';
import  {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {BsFlag} from 'react-icons/bs';
import styles from './RatingItem.module.css';
import chooseQualityColor from '../../hook/qualityColor';


const rateNumToText = (rate) => {
    switch ( rate )
    {
        case 1 :    
        return "Awful"

        case 2 :     
        return "Ok"

        case  3:    
        return "Good"

        case 4:    
        return "Great"

        case 5:    
        return "Awesome"

    }
}

const RatingItem = ({item, course}) => {

    const qualityColor = chooseQualityColor(item.quality);

    return (
        <div className={styles.bodyBox}>
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.mainInfoBox}>
                        <Stack>
                            <div>QUALITY</div>
                            <div 
                            className={styles.numBox}
                            style={{backgroundColor: `${qualityColor}`}}
                            >
                                <div className={styles.numBoxText}>{item.quality.toFixed(1)}</div>
                            </div>
                        </Stack>
                        <Stack>
                            <div>DIFFICULTY</div>
                            <div 
                            className={styles.numBox} 
                            style={{backgroundColor:'lightgrey'}}
                            >
                                <div className={styles.numBoxText}>{item.difficulty.toFixed(1)}</div>
                            </div>
                        </Stack>
                    </div>
                    <div>
                    <Stack gap={3} className="mt-3 ms-3">
                        {/* 간격 맞춰서 패딩 줘야 하면 <Stack direction="horizontal" gap={3}></Stack> 이거 쓰자. */}
                        <Stack className="ps-2" direction="horizontal" gap={3}>
                            <div style={{fontWeight:'900'}}>{course.name}</div>
                            <div style={{fontWeight:'600'}}>{rateNumToText(item.rate)}</div>
                        </Stack>
                        <div className={styles.moreInfoBox}>
                            <div className={styles.moreInfoItem}>For Credit: <span style={{fontWeight:'700'}}>Yes</span></div>
                            <div className={styles.moreInfoItem} >Attendance: <span style={{fontWeight:'700'}}>{item.attendance? "Mandatory":"Not Mandatory"}</span></div>
                            <div className={styles.moreInfoItem}>Would Take Again: <span style={{fontWeight:'700'}}>{item.WTCA? "Yes": "No"}</span></div>
                            <div className={styles.moreInfoItem} >Grade: <span style={{fontWeight:'700'}}>{item.grade}</span></div>
                        </div>
                        <div className="ps-2">
                            Textbook: <span style={{fontWeight:'700'}}>{item.textbook? "Yes": "No"}</span>
                        </div>
                        <div className={styles.reviewText}>
                            {item.review}
                        </div>
                        <div className={styles.voteBox}>
                            <div className="pe-4"><FiThumbsUp /><span className={styles.voteNum}>{item.thumbsUp}</span></div>
                            <div><FiThumbsDown /><span className={styles.voteNum}>{item.thumbsDown}</span></div>
                        </div>
                    </Stack>
                    </div>
                </div>
                <div className="d-flex flex-column  justify-content-between align-items-end">
                    <div className={styles.date}>Dec 1st, 2017</div>
                    <BsFlag style={{fontSize:'1.8rem'}}/>
                </div>
            </div>
        </div>
    )
}

export default RatingItem;