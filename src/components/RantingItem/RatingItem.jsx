import React from 'react';
import { Stack } from 'react-bootstrap';
import  {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {BsFlag} from 'react-icons/bs';
import styles from './RatingItem.module.css';
import chooseQualityColor from '../../hook/qualityColor';

const RatingItem = ({item}) => {

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
                                <div className={styles.numBoxText}>4.5</div>
                            </div>
                        </Stack>
                        <Stack>
                            <div>DIFFICULTY</div>
                            <div 
                            className={styles.numBox} 
                            style={{backgroundColor:'lightgrey'}}
                            >
                                <div className={styles.numBoxText}>1.0</div>
                            </div>
                        </Stack>
                    </div>
                    <div>
                    <Stack gap={3} className="mt-3 ms-3">
                        {/* 간격 맞춰서 패딩 줘야 하면 <Stack direction="horizontal" gap={3}></Stack> 이거 쓰자. */}
                        <Stack direction="horizontal" gap={3}>
                            <div style={{fontWeight:'900'}}>SOCW200</div>
                            <div style={{fontWeight:'600'}}>AWESOME</div>
                        </Stack>
                        <div className={styles.moreInfoBox}>
                            <div className={styles.moreInfoItem}>For Credit: <span style={{fontWeight:'700'}}>Yes</span></div>
                            <div className={styles.moreInfoItem} >Attendance: <span style={{fontWeight:'700'}}>Not Mandatory</span></div>
                            <div className={styles.moreInfoItem}>Would Take Again: <span style={{fontWeight:'700'}}>No</span></div>
                            <div className={styles.moreInfoItem} >Grade: <span style={{fontWeight:'700'}}>B</span></div>
                        </div>
                        <div>
                            Textbook: <span style={{fontWeight:'700'}}>Yes</span>
                        </div>
                        <div className={styles.reviewText}>
                            Amazing professor! Amazing professor! Amazing professor! Amazing professor! Amazing professor!
                        </div>
                        <div className={styles.voteBox}>
                            <div className="pe-4"><FiThumbsUp /><span className={styles.voteNum}>1</span></div>
                            <div><FiThumbsDown /><span className={styles.voteNum}>0</span></div>
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