import React, { useState, UseEffect } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Redirect } from 'react-router-dom';
import styles from './Signing.module.scss';



export const Signing = () => {
    const [newUser, setNewUser] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [redirect, setRedirect] = useState(null);

    const handleRedirect = () => {
        setRedirect('/') // to be changed to desired path
    }
    const handleNoAccount = () => {
        setNewUser(true);
    };

    const handleHasAccount = () => {
        setNewUser(false);

    }
    return (<div className={styles.wrapper}>
        { redirect ? <Redirect to={redirect} /> : ''}
        {newUser ? <SignUp handleHasAccount={handleHasAccount}/> 
        : <SignIn handleNoAccount={handleNoAccount} />}
    </div>)
}