import {Stack} from 'react-bootstrap';
import  {FaRegBookmark} from 'react-icons/fa';
import  {FaBookmark} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Item.module.css';
import chooseQualityColor from '../../hook/qualityColor';
import useToggle from '../../hook/useToggle';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContent';
import useOnError from '../../hook/useOnError';
import { useEffectOnce } from '../../hook/useEffectOnce';





const Item = ({item, accountService, dataService}) => {

    const [error, onError] = useOnError('');
    const qualityColor = chooseQualityColor(item.quality);

    const navigate = useNavigate();
    const handleClick = (e) => {
            //console.log(e.currentTarget); 부모박스가 선택되네
        
        const prevent = e.target.className.baseVal;
        if(prevent === 'bookmark-off' || prevent === 'bookmark-on' || prevent === '') return
        //배열 index까지 정확하게 붙여주는 거 까먹지 않기.

        //TODO:왜 가끔씩 scrollTo가 안먹히는 지 알아보기.
        //갑자기 scrollTo안해도 위로가네.
        //Prof.jsx에서 profInfo 존재할 때만 InfoBox를 받아오기로 하니까
        //window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/profs/${item.id}`)
        dataService
        .postView(item.id)
        .catch(onError);
        
    }

    const [visible, toggleVisibility] = useToggle(false);

    const { user } = useAuth();

    // useEffect(() => {
    //     accountService
    //     .getBookmark(item.id)
    //     .then(i => {
    //         if(i && !visible) {
    //             console.log(i);
    //             toggleVisibility();
    //         }
    //     })
    //     .catch(onError);
        
    // }, [accountService])

    useEffectOnce( ()=> {
        accountService
        .getBookmark(item.id)
        .then(i => {
            if(i && !visible) {
                toggleVisibility();
            }
        })
        .catch(onError);
    }, [accountService]);
    


    const handleBookmark = () => {

        !visible?
        accountService
        .postBookmark(item.id)
        .catch(onError)
        :accountService
        .deleteBookmark(item.id)
        .catch(onError);

        toggleVisibility();
    }



    return (
        <div className={styles.box} onClick={handleClick}>
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
                        <span style={{fontWeight: 'bolder', color:'rgba(0, 0, 0)'}} >{item.WTA < 0? "N/A": item.WTA+"%"} </span> 
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
            <div  className={styles.bookmark}>
                {
                    user &&
                    <div onClick={handleBookmark} >
                        {
                            visible? 
                            <FaBookmark className="bookmark-on" style={{color: '#F93E69'}} />
                            :<FaRegBookmark className="bookmark-off" />
                        }
                    </div>
                }
            </div>
            
            
        </div>
    )
}

export default Item;