import {Stack} from 'react-bootstrap';
import  {FaRegBookmark} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Item.module.css';
import chooseQualityColor from '../../hook/qualityColor';


const Item = ({item}) => {

    const qualityColor = chooseQualityColor(item.quality);

    const navigate = useNavigate();
    const handleClick = () => {
        console.log(item.id);
        navigate(`/search/${item.id}`)
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