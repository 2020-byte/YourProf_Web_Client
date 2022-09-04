import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './SelectBox.module.css';


// TODO: 클릭했을 때 박스 열릴 때 깝빡이는 거 고쳐야함
const SelectBox = ({name, id, items, handleSelect, selectedValue}) => {


    const onChange = (e) => {
        handleSelect(e.target.value);
    };

    

    return (
        <div className={styles.body}>
            <label htmlFor={name} className={styles.label}>
                {name[0].toUpperCase() + name.slice(1)}: 
                {/* 모두 소문자로 이루어진 문자열에서 첫번째 문자만 대문자로 */}
            </label>
            <Form.Select 
            name={name} 
            id={id} 
            onChange={onChange} 
            aria-label="Default select example"
            className="my-3 d-inline w-50"
            size="lg"
            value={selectedValue? selectedValue: 'defaultValue'}
            >
                <option value="defaultValue"  style={{display: 'none'}}> --Please choose an {name}-- </option>
                <option value="any">All {name}</option>
                {items.map(i => (
                    <option
                        key={i.id} 
                        value={i.name}
                    >
                        {i.name}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}

export default SelectBox;