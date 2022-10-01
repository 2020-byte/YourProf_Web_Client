import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import  {FaRegBookmark} from 'react-icons/fa';
import  {FaBookmark} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './InfoBox.module.css';
import chooseQualityColor from '../../hook/qualityColor';
import useToggle from '../../hook/useToggle';
import { useAuth } from '../../context/AuthContent';

const InfoBox = ({item}) => {

    const { user } = useAuth();

    //TODO: customHook처리하기
    const qualityColor = chooseQualityColor(item.quality);
    
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/rateProf/${item.id}`)
        window.scrollTo({ top: 0, behavior: "smooth" });

    }

    const [visible, toggleVisibility] = useToggle(false);

    return (
        <div>
            <div className={styles.mainInfoBox}>
                <Stack className={styles.qualityInfoBox}>
                    <div className="d-flex">
                        <div className={styles.qualityBox} style={{backgroundColor: `${qualityColor}`}}>
                            <div className={styles.quality} >
                                {item.quality < 0? "N/A": item.quality.toFixed(1)}
                            </div>
                        </div>
                        <div className={styles.qualityOutOf}> / 5</div>
                    </div>
                    <span className="pb-3">Overally Qualiity Based on <span style={{fontWeight:"900"}}>{item.ratings}</span> ratings</span>
                    <div className="d-flex justify-content-between">
                        <span className={styles.name}>{item.name}</span>
                        {
                            user &&
                            <div className={styles.bookmark}>
                                <div onClick={() => toggleVisibility()}  >
                                    {
                                        visible? <FaBookmark style={{color: '#F93E69'}}/>
                                        :<FaRegBookmark/>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="pb-3">
                        Professor in the {item.department} at {item.university}
                    </div>
                    <div className={styles.numericInfoBox}>
                        <div className={styles.numericInfoItem}>
                            <div style={{fontSize: '3rem', fontWeight: '800'}}>{item.WTA}</div>
                            <p>Would take again</p>
                        </div>
                        <div className={styles.numericInfoItem} style={{border:'none'}}>
                            <div style={{fontSize: '3rem', fontWeight: '800'}}>{item.LOD < 0 ? "N/A": item.LOD}</div>
                            <p>Level of Difficulty</p>
                        </div>
                    </div>
                    <Button 
                    className={styles.rateButton}
                    onClick={onClick}
                    >
                        Rate Professor {item.name}
                    </Button>                    
                </Stack>
                <div className={styles.canvasBox}>
                    <canvas width="100%"></canvas>
                    {/* canvas width defualt가 300px */}
                </div>
            </div>
        </div>
    )
}

export default InfoBox;