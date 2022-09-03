import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styles from './Header.module.css';
import DropdownItem from '../DropdownItem/DropdownItem';

const Header = (props) => {

    const navigate = useNavigate();

    const searchRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?prof=${searchRef.current.value}`)
    };

    return (
        <Navbar className={styles.navbar} expand="xl">
            <Container fluid className={"mx-lg-5 "+styles.container}>
                <Navbar.Brand as="span" className="mx-sm-0">
                    <Link to="/" className={styles.brand} >YOUR PROF</Link>
                </Navbar.Brand>
                    <Form 
                        onSubmit={onSubmit}
                        className="d-flex w-50 me-1"
                    >
                        <Form.Control
                            ref={searchRef}
                            type="search"
                            placeholder="Search Your Professor"
                            className="me-2"
                            aria-label="Search"
                            size="lg"
                        />
                        <Button variant="outline-success" className="px-2" onClick={onSubmit}>
                            <BsSearch className="pb-1" style={{fontSize: "1.5em"}} />
                        </Button>
                    </Form>
                    <Dropdown title="Account" id="ScrollingDropdown" align="end">
                    <DropdownItem address='/profile' name='My Profile'/>
                    <DropdownItem address='/bookmark' name='BookMark' /> 
                    <Dropdown.Divider />
                    <DropdownItem address='/login' name='Log Out' /> 
                    </Dropdown>
            </Container>
        </Navbar>
    );
}

export default Header;