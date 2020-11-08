import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import firebase from "../../util/firebaseSetUp";
import formToJSON from '../../util/formToJSON';
import styles from './ForgottenPassword.module.scss';
import {Button} from '../Button/Button';

export const ForgottenPassword = (props) => {


    const [redirect, setRedirect] = useState(null);
    const [successful, setSuccessful] = useState(false);

    if (props.isSignedIn === true && redirect === null) {
        setRedirect('/');
    }

    const handleForgottenPassword = (event) => {
        event.preventDefault();
        const form = document.getElementById('forgottenPWForm');
        const email = formToJSON(form)['email'];
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            setSuccessful(true);
        }).catch(function (error) {
            console.error(error);
            let errorCode = error.code
            switch (errorCode) {
                case 'auth/invalid-email':
                    return alert("Email invalide. Veuillez vérifier votre email.");
                case 'auth/user-not-found':
                    return alert('Aucun utilisateur ne correspond');
                default: return alert("La demande a échoué. Veuillez réessayer plus tard");

            }
        });
    }

    const onInit = <div>
        <h1>Mot de passe oublié?</h1>
        <form id='forgottenPWForm'>
            <label className={styles.label} for='email'>Veuillez entrer votre email</label>
            <input className={styles.inputField} type='text' name='email' />
            <br/><br/>
            <Button variant='primary' text='Soumettre la demande' onClick={handleForgottenPassword} />

        </form>
    </div>;

    const onSuccess = <div><h2>Demande envoyée</h2>
        <p>Un email contenant un lien pour réinitialiser votre mot de passe vous a été envoyé</p>
        <br/><br/>

      <Button variant='primary' text={
       <Link to={'/'}>Retour à la page d'accueil</Link> } />


    </div>;

    return (<div className={styles.wrapper}>
        { redirect ? <Redirect to={redirect} /> : ''}
        <div className={styles.contentWrapper}>
        { successful ? onSuccess : onInit}
        </div>
    </div>
    )
}