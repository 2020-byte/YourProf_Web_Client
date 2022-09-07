import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import {AiOutlineCheck} from 'react-icons/ai';
import { MdCancel} from "react-icons/md";
import styles from './RadioItem.module.css';

const RadioItem = ({name, handleSelect}) => {

    const [selectedValue, setSelectedValue] = useState();
    
    const handleChange = (e) => {
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
            value="Yes"
            name={name}
            type="radio"
            checked={selectedValue === "Yes"}
            onChange={handleChange}
            onClick={handleChange}
            style=
            {{
                backgroundColor:`${selectedValue === 'Yes'
                || (isHover && answer === 'Yes') ? "lightgreen": "transparent"}`
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
            value="No"
            name={name}
            type="radio"
            checked={selectedValue === "No"}
            onChange={handleChange}
            onClick={handleChange}
            style=
            {{
                backgroundColor:`${selectedValue === 'No'
                || (isHover && answer === 'No') ? "red": "transparent"}`
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