import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './SelectBox.module.css';


// TODO: 클릭했을 때 박스 열릴 때 깝빡이는 거 고쳐야함
const SelectBox = ({name, id, items, handleSelect, selectedValue, setAll, setNA, setLabel, setWidth}) => {

    const All = setAll === undefined? true: setAll;
    const NA = setNA === undefined? true: setNA;
    const Label = setLabel === undefined? true: setLabel;
    const width = setWidth === undefined? '50%': setWidth;

    const onChange = (e) => {
        //console.log(e.target.value);
        handleSelect(e.target.value);
    };

    

    

    return (
        <div className={styles.body}>
            {
                Label &&
                <label htmlFor={name} className={styles.label}>
                    {name[0].toUpperCase() + name.slice(1)}: 
                    {/* 모두 소문자로 이루어진 문자열에서 첫번째 문자만 대문자로 */}
                </label>
            }
            <Form.Select 
            name={name} 
            id={id} 
            onChange={onChange} 
            aria-label="Default select example"
            className="my-3 d-inline"
            style={{width: width}}
            // className이랑 style이랑 값주는 게 겹치면 style안 먹힘. 그리고 비율 이상한 거 내가 이미 조정해논 거일 가능성을 인지하기
            size="lg"
            value={selectedValue? selectedValue: 'defaultValue'}
            >
                <option value="defaultValue"  style={{display: 'none'}}> --Please choose an {name}-- </option>
                {All && <option value={0} >All {name}</option>}
                {!NA && <option value={0} >N/A</option>}
                {items.map(i => (
                    <option
                        key={i.id}
                        value={i.id}
                        name={i.name}
                    >
                        {i.name}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}

export default SelectBox;