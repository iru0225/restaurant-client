import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './signin.style.scss';

import InputComponent from '../../components/input/input.component';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const error = {
    username: {
        hasError: false,
        message: null
    },
    password: {
        hasError: false,
        message: null
    },
    signup_username: {
        hasError: false,
        message: null
    },
    signup_password: {
        hasError: false,
        message: null
    },
    name: {
        hasError: false,
        message: null
    },
    confirm_password: {
        hasError: false,
        message: null
    }
}

const SigninPage = ({user, loginHandle}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [errors, setErrors] = useState(error);

    const history = useHistory();

    useEffect(() => {
        if (!user) {
            let data = localStorage.getItem('user');
            if (data) {
                loginHandle(data);
                return history.push('/');
            }
          }
    }, [])

    const checkUsername = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, username: {hasError: true, message: 'Username cannot be empty'}}
            });

            return setUsername(null);
        }

        setErrors(oldData => {
            return {...oldData, username: {hasError: false, message: null}}
        });

        setUsername(val);
    }

    const checkPassword = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, password: {hasError: true, message: 'Password cannot be empty'}}
            });

            return setPassword(null);
        }

        setErrors(oldData => {
            return {...oldData, password: {hasError: false, message: null}}
        });

        setPassword(val);
    }

    const checkSignupUsername = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, signup_username: {hasError: true, message: 'Username cannot be empty'}}
            });

            return setUsername(null);
        }

        setErrors(oldData => {
            return {...oldData, signup_username: {hasError: false, message: null}}
        });

        setUsername(val);
    }

    const checkSignupPassword = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, signup_password: {hasError: true, message: 'Password cannot be empty'}}
            });

            return setPassword(null);
        }

        setErrors(oldData => {
            return {...oldData, signup_password: {hasError: false, message: null}}
        });

        setPassword(val);
    }

    const checkName = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, name: {hasError: true, message: 'Name cannot be empty'}}
            });

            return setName(null);
        }

        setErrors(oldData => {
            return {...oldData, name: {hasError: false, message: null}}
        });

        setName(val);
    }

    const checkConfirmPassword = (val) => {
        if (!val) {
            setErrors(oldData => {
                return {...oldData, confirm_password: {hasError: true, message: 'Confirm password cannot be empty'}}
            });

            return setConfirmPassword(null);
        }

        if (val !== password) {
            setErrors(oldData => {
                return {...oldData, confirm_password: {hasError: true, message: 'Confirm password does not match'}}
            });

            return setConfirmPassword(val);
        }

        setErrors(oldData => {
            return {...oldData, confirm_password: {hasError: false, message: null}}
        });

        setConfirmPassword(val);
    }

    const userSignup = async () => {
        if (!username || !password || !name || errors.confirm_password.hasError) {
            return
        }

        let data = {
            username: username,
            password: password,
            name: name
        }
        
        await axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/create',
            data: data
        }).then(res => {
            let data = res.data;

            Swal.fire({
                title: 'Registration Successful',
                icon: 'success'
            }).then(() => {
                localStorage.setItem('user', JSON.stringify(data));
                loginHandle(data);
                history.push('/')
            })
        }).catch(err => {
            Swal.fire({
                title: err.message,
                icon: 'error'
            })
        })
    }

    const userLogin = () => {
        if (!username || !password) {
            return;
        }

        let data = {
            username: username,
            password: password
        }

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/login',
            data: data
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
            loginHandle(res.data);
            history.push('/');
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <div className="signin-signup">
            <div className="signin">
                <div className="signin-title">
                    <h2>Signin</h2>
                    <p>Signin with username & password</p>
                </div>
                <div className="signin-input">
                    <div>
                        <InputComponent
                            labelName={'Username'}
                            parentCallback={checkUsername}
                            error={errors.username}
                        />
                    </div>
                    <div>
                        <InputComponent
                            labelName={'Password'}
                            type={'password'}
                            parentCallback={checkPassword}
                            error={errors.password}
                        />
                    </div>
                </div>
                <div className="signin-button">
                    <button onClick={userLogin}>Signin</button>
                </div>
            </div>
            <div className="signup">
                <div className="signup-title">
                    <h2>Signup</h2>
                    <p>Create new account</p>
                </div>
                <div className="signup-input">
                    <div>
                        <InputComponent
                            labelName={'Name'}
                            parentCallback={checkName}
                            error={errors.name}
                        />
                    </div>
                    <div>
                        <InputComponent
                            labelName={'Username'}
                            parentCallback={checkSignupUsername}
                            error={errors.signup_username}
                        />
                    </div>
                    <div>
                        <InputComponent
                            labelName={'Password'}
                            type={'password'}
                            parentCallback={checkSignupPassword}
                            error={errors.signup_password}
                        />
                    </div>
                    <div>
                        <InputComponent
                            labelName={'Confirm Password'}
                            type={'password'}
                            parentCallback={checkConfirmPassword}
                            error={errors.confirm_password}
                        />
                    </div>
                </div>
                <div className="signup-button">
                    <button onClick={userSignup}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SigninPage