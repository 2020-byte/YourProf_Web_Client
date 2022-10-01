import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';


const bodyStyle = {
    backgroundColor: "rgb(247, 247, 247)",
    padding: "5%",
    borderRadius: "10px",
    boxShadow: "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
}


const Login = ({onSignUp, onLogin}) => {

    const [signup, setSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [isAlert, setIsAlert] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        if (signup) {
        onSignUp(username, password, name, email).catch(setError);
        } else {
        onLogin(username, password).catch(setError);
        }
    };

    const setError = (error) => {
        setText(error.toString());
        setIsAlert(true);
    };

    const onChange = (event) => {
        const {
        target: { name, value, checked },
        } = event;
        switch (name) {
        case 'username':
            return setUsername(value);
        case 'password':
            return setPassword(value);
        case 'name':
            return setName(value);
        case 'email':
            return setEmail(value);
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
                    placeholder='Id'
                    value={username}
                    onChange={onChange}
                    className='form-input'
                    required
                    />
                    <Form.Control
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    className='form-input'
                    onChange={onChange}
                    />
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