import React from 'react';
import { Stack } from 'react-bootstrap';
import  {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import  {HiThumbUp, HiThumbDown} from 'react-icons/hi';
import {BsFlag, BsFlagFill} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import styles from './RatingItem.module.css';
import chooseQualityColor from '../../hook/qualityColor';
import useToggle from '../../hook/useToggle';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContent';
import { useNavigate, useSearchParams } from 'react-router-dom';


const findRateInfo = (rate) => {
    switch ( rate )
    {
        case 1 :    
        return ["Awful", "#F1C4B8"]

        case 2 :     
        return ["Ok", "#F7C089"]

        case  3:    
        return ["Good", "#F7EEA0"]

        case 4:    
        return ["Great", "#EBF7A0"]

        case 5:    
        return ["Awesome", "#A5FE95"]

    }
}


const RatingItem = ({item, course}) => {


    const {user} = useAuth();
    

    const qualityColor = chooseQualityColor(item.quality);

    const [thumbsUp, setThumbsUp, setThumbsUpStatus] = useToggle(false);

    const [thumbsDown, setThumbsDown, setThumbsDownStatus] = useToggle(false);

    useEffect(() => {
        thumbsUp && setThumbsDownStatus(false)
    }, [thumbsUp])

    useEffect(() => {
        thumbsDown && setThumbsUpStatus(false)
    }, [thumbsDown])

    const [report, setReport] = useToggle(false);


    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/profs/${item.profId}/ratings/${item.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }



    const handleDelete = () => {
        if (window.confirm('Do you want to delete?')) {
            
        }
    }

    return (
        <div className={styles.bodyBox}>
            <div className={styles.body}>
                <div className={styles.contentBox}>
                    <div className={styles.mainInfoBox}>
                        <Stack className="pt-3">
                            <div>QUALITY</div>
                            <div 
                            className={styles.numBox}
                            style={{backgroundColor: `${qualityColor}`}}
                            >
                                <div className={styles.numBoxText}>{item.quality.toFixed(1)}</div>
                            </div>
                        </Stack>
                        <Stack className="pt-3">
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
                            <div className={styles.rateBox} style={{ backgroundColor: `${findRateInfo(item.quality)[1]}`}}>{findRateInfo(item.quality)[0]}</div>
                        </Stack>
                        <div className={styles.moreInfoBox}>
                            {/* for credit sequelize로 column 생성해줘야함. 없는 줄 알고 안했음 */}
                            <div className={styles.moreInfoItem}>For Credit: <span style={{fontWeight:'700'}}>{item.attendance === null? "N/A": item.TFC? "Yes": "No"}</span></div>
                            <div className={styles.moreInfoItem} >Attendance: <span style={{fontWeight:'700'}}>{item.attendance === null? "N/A": item.attendance? "Mandatory":"Not Mandatory"}</span></div>
                            <div className={styles.moreInfoItem}>Would Take Again: <span style={{fontWeight:'700'}}>{item.WTCA === null? "N/A": item.WTCA? "Yes": "No"}</span></div>
                            <div className={styles.moreInfoItem} >Grade: <span style={{fontWeight:'700'}}>{item.gradename}</span></div>
                        </div>
                        <div className="ps-2">
                            Textbook: <span style={{fontWeight:'700'}}>{item.textbook === null? "N/A": item.textbook? "Yes": "No"}</span>
                        </div>
                        <div className={styles.reviewText}>
                            {item.review}
                        </div>
                        <div className={styles.voteContainer}>
                            <div className={styles.voteBox}>
                                <span onClick={() => user && setThumbsUp()}>
                                    {
                                        user && thumbsUp? <HiThumbUp style={{color: '#F93E69'}}/>
                                        : <FiThumbsUp />
                                    }
                                </span>
                                <span className={styles.voteNum}>{item.likes}</span>
                            </div>
                            <div style={{paddingRight: '6%'}}>
                                <span onClick={() => user && setThumbsDown()}>
                                    {
                                        user && thumbsDown? <HiThumbDown style={{color: '#F93E69'}}/>
                                        : <FiThumbsDown />
                                    }
                                </span>
                                <span className={styles.voteNum}>{item.dislikes}</span>
                            </div>
                        </div>
                    </Stack>
                    </div>
                </div>
                <div className="d-flex flex-column  justify-content-between align-items-end">
                        <div className={styles.date}>{item.updatedAt}</div>
                    {
                        user && !true &&
                        <div onClick={() => setReport()} className={styles.icon} style={{fontSize:'1.8rem'}}>
                            {
                                report? <BsFlagFill style={{color: "red"}}/>:
                                <BsFlag/>
                            }
                        </div>
                    }
                    {
                        user && true && //TODO: current user가 쓴 건지 매치할 수 있도록 해야함.
                        <div className={styles.fixBox} >
                            <div className={styles.icon} onClick={handleEdit}>
                                <BiEdit />
                            </div>
                            <div className={styles.icon} style={{paddingLeft: "10px"}} onClick={handleDelete}>
                                <RiDeleteBin6Line/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RatingItem;