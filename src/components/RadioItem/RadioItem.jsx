import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import { MdCancel} from "react-icons/md";
import styles from './RadioItem.module.css';

const RadioItem = ({name, handleSelect, initialValue}) => {


    //initialValue === true? 1: initialValue === false? 0: initialValue 이렇게 햇을 때,
    //왜 이 component밖에서 0이 나오는 지 이해가 안되네
    //그거 알아보기
    console.log(initialValue);
    const [selectedValue, setSelectedValue] = useState(initialValue);
    
    const handleChange = (e) => {
        selectedValue === e.target.value?
        setSelectedValue():
        setSelectedValue(e.target.value);
    }

    useEffect(() => {
        handleSelect(selectedValue)
    }, [selectedValue])

    const [isHover, setIsHover] = useState(false);
    const [answer, setAnswer] = useState();


    const handleMouseEnter = (e) => {
        setAnswer(e.target.value);
        setIsHover(true);     
    };
    //TODO: select랑 answer랑 헷갈릴 여지가 있으므로 수정하기

    const handleMouseLeave = () => {
        setAnswer();
        setIsHover(false);
    };

    
    return (
        <div className={styles.body}>
            <div className={styles.inputBox} >
            <input
            className={styles.input}
            id="1"
            value={1}
            name={name}
            type="radio"
            checked={selectedValue == 1}
            onChange={handleChange}
            onClick={handleChange}
            style=
            {{
                backgroundColor:`${selectedValue == 1
                || (isHover && answer == 1) ? "lightgreen": "transparent"}`
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            />
            <label className={styles.label} htmlFor="1">Yes</label>
            </div>
            
            <div className={styles.inputBox}>
            <input
            className={styles.input}
            id="2"
            value={0}
            name={name}
            type="radio"
            checked={selectedValue == 0}
            onChange={handleChange}
            onClick={handleChange}
            style=
            {{
                backgroundColor:`${selectedValue == 0
                || (isHover && answer == 0) ? "red": "transparent"}`
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            />
            {/* {
                selectedValue === 'No'|| (isHover && answer === 'No') &&
                <MdCancel />
            }     */}
            <label className={styles.label} htmlFor="2">No</label>
            </div>
            
        </div>
    )
}

export default RadioItem;