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
import { useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';

const Header = ({handleLogout, handleSignin, user}) => {

    const navigate = useNavigate();

    const searchRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/profs?search=${searchRef.current.value}`)
    };


    const location = window.location.pathname
    useEffect(() => {
        if(!location.includes('/search')) searchRef.current.value = "";
        //!이걸로 반대로 해야되는 데 반대로 안해서 잠깐 헷갈림.
    }, [location])


    const handleClick = (e) => {

        if(e.target.id != "logOut") {
            navigate(`/${e.target.id}`);
            return;
        }

        handleLogout();
        
    }

    return (
        <Navbar className={styles.navbar} expand="xl">
            <Container fluid className={"mx-lg-5 "+styles.container}>
                <Navbar.Brand as="span" className="mx-0">
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
                    {
                        user &&
                        <Dropdown title="Account" id="ScrollingDropdown" align="end">
                        <Dropdown.Item id="profile" onClick={handleClick}>My Profile</Dropdown.Item>
                        <Dropdown.Item id="bookmark" onClick={handleClick}>Bookmark</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item id="logOut" onClick={handleClick}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    }
                    {
                        !user &&
                        <button className={styles.signButton} onClick={handleSignin}>Sign In</button>

                    }
            </Container>
        </Navbar>
    );
}

export default Header;