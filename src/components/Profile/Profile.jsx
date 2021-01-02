import styles from './Profile.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import firebase from '../../util/firebaseSetUp';
import { Redirect, Link } from 'react-router-dom';
import { Button } from '../Button/Button';

export const Profile = (props) =>{

    const [redirect, setRedirect] = useState(null);

    let toReturn;
    const handleSignOut = (event) => {
        event.preventDefault();
        firebase.auth().signOut().then(() => setRedirect('/'));
    }

    useEffect(() => {
        onInit();
    });

    const onInit = () => {
        console.log('init profile page')
        console.log(props.props.isSignedIn)

        // Make it work 
        if (!props.props.user) {
            setRedirect('/sign-in');
    }}
  
  return (<div className={styles.wrapper}>
      { redirect ? <Redirect to={redirect} /> : ''}
         { props.props.user ? (<div className={styles.contentWrapper}>
                    <h2>Bonjour {props.props.user.displayName}</h2>

                    <h3>Vous êtes connecté avec l'adresse: {props.props.user.email}</h3>
                    <br></br>
                    <Button variant="primary" onClick={handleSignOut} text='Se déconnecter' />
                </div>) : '' }
    </div>
    )
}