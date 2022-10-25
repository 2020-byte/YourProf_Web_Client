import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';


const bodyStyle = {
    backgroundColor: "rgb(247, 247, 247)",
    padding: "5%",
    borderRadius: "10px",
    boxShadow: "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
}

const warning = {
    margin: "0% 2% 0% 2%",
    fontSize: "90%",
    color: "rgb(220, 63, 63)"
}


const Login = ({onSignUp, onLogin}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        user && navigate("/");
    }, [user]);

    const passwordRef = useRef();
    const [signup, setSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [text, setText] = useState('');
    // const [isAlert, setIsAlert] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);


    const usernameForm = /^[a-zA-z0-9]{4,}$/;;
    const passwordForm = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const emailForm = /@student.ubc.ca$/;
    
    //TODO: `이거 체크안해주는데?? 이거 알아보고 고치기
    const nameForm = /^[a-zA-z0-9]{4,12}$/;



    const onSubmit = (event) => {
        event.preventDefault();
        if (signup) {
            onSignUp(username, password, name, email)//.catch(setError);
        } else {
            onLogin(username, password)//.catch(setError);
        }
    };

    // const setError = (error) => {
    //     setText(error.toString());
    //     setIsAlert(true);
    // };

    const onChange = (event) => {
        const {
        target: { name, value, checked },
        } = event;
        switch (name) {
        case 'username':
            setUsername(value);
            setUsernameError(usernameForm.test(value));
            return 
        case 'password':
            setPassword(value);
            setPasswordError(passwordForm.test(value));
            return 
        case 'checkPassword':
            setCheckPassword(value);
            setPasswordCheckError(passwordRef.current.value === value)
            return 
        case 'name':
            setName(value);
            setNameError(nameForm.test(value));
            return 
        case 'email':
            setEmail(value);
            setEmailError(emailForm.test(value));
            return 
        case 'signup':
            return setSignup(checked);
        default:
        }
    };

    return (
        <div style={bodyStyle}>
            <Form className='auth-form' onSubmit={onSubmit}>
                <Stack gap="2">
                    <Form.Control
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={onChange}
                    className='form-input'
                    required
                    />
                    {signup && !usernameError  && username && <p style={warning}>Please enter at least 4 digits using a combination of only uppercase and lowercase letters or numbers</p>}
                    <Form.Control
                    ref={passwordRef}
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    className='form-input'
                    onChange={onChange}
                    />
                    {signup && !passwordError  && password && <p style={warning}>Please enter at least 8 digits using a combination of numbers + English letters + special characters!</p>}
                    {signup && (
                    <Form.Control
                    name='checkPassword'
                    type='password'
                    placeholder='Password Check'
                    value={checkPassword}
                    className='form-input'
                    onChange={onChange}
                    />
                    )}
                    {signup && !passwordCheckError && checkPassword && <p style={warning}>Passwords do not match!</p>}
                    {signup && (
                    <Form.Control
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                    )}
                    {signup && !nameError && name && <p style={warning}>Please enter 4 to 12 digits using a combination of only uppercase and lowercase letters or numbers</p>}
                    {signup && (
                    <Form.Control
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                    )}
                    {signup && !emailError && (<p style={warning}>Email must end with @student.ubc.ca</p>)}
                </Stack>
                <div className='form-signup'>
                <input
                    name='signup'
                    id='signup'
                    type='checkbox'
                    onChange={onChange}
                    checked={signup}
                />
                <label className="my-3 ms-1" htmlFor='signup'> Create a new account?</label>
                </div>
                <Button className='form-btn auth-form-btn w-100' type='submit'>
                {signup ? 'Sign Up' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default Login;