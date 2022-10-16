import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import styles from './RateBox.module.css';


const findRateInfo = (rate) => {
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

const RateBox = ({handleSelect, initialValue}) => {


    const itemNum = [1, 2, 3, 4, 5];
    


    const [preRate, setPreRate] = useState();
    const [rate, setRate] = useState(initialValue);
    const [clicked, setClicked] = useState(initialValue?true:false);

    useEffect(() => {
        handleSelect(rate);
    },[rate])


    const handleMouseEnter = (e) => {
        // setPreRate(e._targetInst.key);
        setPreRate(e.currentTarget.id);        
        
    };//mouse event 맨아래에 거기에 key._targetInst.key 있음.
    //id={}임의로 집어넣고 e.currentTarget.id 사용할 수
    
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
                //e.currentTarget.id가 cllaback함수에서 안불러지내.
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
                            backgroundColor: `${i <= preRate? findRateInfo(i)[1]:preRate && i <= rate? findRateInfo(i)[1]: i <= rate? findRateInfo(i)[2] :'#EAE8E8' }`,
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
                        <div>{"1 - "+findRateInfo(1)[0]}</div>
                        <div>{"5 - "+findRateInfo(5)[0]}</div>
                    </div>
                }
                {preRate && preRate+" - "+findRateInfo(parseInt(preRate))[0]}
                {clicked && !preRate && rate+" - "+findRateInfo(parseInt(rate))[0]}
            </div>
        </>
    )
    
}

export default RateBox;