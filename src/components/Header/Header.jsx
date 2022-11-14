import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/NavDropdown';
import {Link, useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styles from './Header.module.css';
import DropdownItem from '../DropdownItem/DropdownItem';
import { useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';

const Header = ({handleLogout, handleSignin, user}) => {

    const navigate = useNavigate();
    
    // const params = useParams(); 왜 parmas만 안받아와질까
    // const [searchParams] = useSearchParams();
    // console.log(searchParams.get('search'));
    // console.log(params);
    
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const searchRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const pathname = 
        location.pathname.includes('/profs')
        && location.search.includes('?search')
        ? location.pathname: "/profs";
        navigate(`${pathname}?search=${searchRef.current.value}`)
    };


    
    useEffect(() => {
        searchRef.current.value = search? search: "";
    }, [location])


    const handleClick = (e) => {

        if(e.target.id != "logOut") {
            navigate(`/account/${e.target.id}`);
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
                        <Dropdown.Item id="bookmarks" onClick={handleClick}>Bookmark</Dropdown.Item>
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