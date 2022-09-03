import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './SelectBox.module.css';

const SelectBox = ({name, id, items, handleSelect, selectedValue}) => {


    console.log(selectedValue);
    const onChange = (e) => {
        handleSelect(e.target.value);
    };

    

    return (
        <div className={styles.body}>
            <label htmlFor={name} className={styles.label}>Department: </label>
            <Form.Select 
            name={name} 
            id={id} 
            onChange={onChange} 
            aria-label="Default select example"
            className="my-3 d-inline w-50"
            size="lg"
            value={selectedValue? selectedValue: 'defaultValue'}
            >
                <option value="defaultValue"  style={{display: 'none'}}> --Please choose an department-- </option>
                <option value="any">Any</option>
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