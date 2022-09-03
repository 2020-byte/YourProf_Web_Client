import React from 'react';
import Dropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import styles from './DropdownItem.module.css';

const DropdownItem = ({name, address}) => {

    return(
        <Dropdown.Item as="div" >
            <Link to={address} className={styles.text}>{name}</Link>
        </Dropdown.Item>
    )
}

export default DropdownItem;