import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import styles from './RateBox.module.css';


const findRateInfo = (rate, isAscending=true) => {
    // if(!isAscending) {
    //     rate = (rate - 6)*(-1);
    // }
    if(!isAscending) {
        rate = (rate - 6)*(-1);
        switch ( rate )
        {
            case 1 :    
            return ["Very difficult", "#F1C4B8", "rgb(235, 87, 87)"] 
    
            case 2 :     
            return ["Difficult", "#F7C089", "rgb(242, 153, 74)"]
    
            case  3:    
            return ["Average", "#F7EEA0", "rgb(242, 201, 76)"]
    
            case 4:    
            return ["Easy", "#EBF7A0", "rgb(142, 207, 111)"]
    
            case 5:    
            return ["Very Easy", "#A5FE95", "rgb(33, 150, 83)"]
    
        }
    } else {
        switch ( rate )
    {
        case 1 :    
        return ["Awful", "#F1C4B8", "rgb(235, 87, 87)"] 

        case 2 :     
        return ["Ok", "#F7C089", "rgb(242, 153, 74)"]

        case  3:    
        return ["Good", "#F7EEA0", "rgb(242, 201, 76)"]

        case 4:    
        return ["Great", "#EBF7A0", "rgb(142, 207, 111)"]

        case 5:    
        return ["Awesome", "#A5FE95", "rgb(33, 150, 83)"]

    }
    }
    
}

const RateBox = ({handleSelect, initialValue, question}) => {
    console.log(question)


    const [itemNum, setItemNum] = useState([1, 2, 3, 4, 5]) ;
    const [isAscending, setIsAscending] = useState(
        question.value == "difficulty"? false: true
    )

    


    const [preRate, setPreRate] = useState();
    const [rate, setRate] = useState(initialValue);
    const [clicked, setClicked] = useState(initialValue?true:false);

    useEffect(() => {
        handleSelect(rate);
    },[rate])


    const handleMouseEnter = (e) => {
        // setPreRate(e._targetInst.key);
        setPreRate(e.currentTarget.id);        
        
    };//mouse event ???????????? ????????? key._targetInst.key ??????.
    //id={}????????? ???????????? e.currentTarget.id ????????? ???
    
    const handleMouseLeave = () => {
        setPreRate();
    };

    const handleClick = (e) => {

        if(!clicked) {
            setClicked(() => true);
            setRate(e.currentTarget.id);

        }
        else if(clicked) {
            
            if(rate === e.currentTarget.id) {
                setClicked(()=>false);
                setRate();
            }
            else if(rate !== e.currentTarget.id) {
                setRate(e.currentTarget.id);
                //e.currentTarget.id??? cllaback???????????? ???????????????.
            }
            
        }
    }

    

    

    return (
        <>
            <div className={styles.body}>
                {
                    itemNum.map(i => (
                        <div 
                        id={i}
                        key={i} 
                        style={{
                            backgroundColor: `${i <= preRate? findRateInfo(i, isAscending)[1]:preRate && i <= rate? findRateInfo(i, isAscending)[1]: i <= rate? findRateInfo(i, isAscending)[2] :'#EAE8E8' }`,
                            borderRadius: `${i==1?'20px 0px 0px 20px':i==itemNum.length?'0px 20px 20px 0px':'0px'}`,
                            cursor: 'pointer'
                        }} 
                        className={styles.item}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        >
                        </div>
                    ))
                }
            </div>
            <div className={styles.rateTextBox}>
                {
                    !preRate && !clicked &&
                    <div className="d-flex justify-content-between">
                        <div>{"1 - "+findRateInfo(1, isAscending)[0]}</div>
                        <div>{"5 - "+findRateInfo(5, isAscending)[0]}</div>
                    </div>
                }
                {preRate && preRate+" - "+findRateInfo(parseInt(preRate), isAscending)[0]}
                {clicked && !preRate && rate+" - "+findRateInfo(parseInt(rate), isAscending)[0]}
            </div>
        </>
    )
    
}

export default RateBox;