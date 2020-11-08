import React, { useState, UseEffect } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Redirect } from 'react-router-dom';
import styles from './Signing.module.scss';
import firebase from "../../util/firebaseSetUp";
import formToJSON from '../../util/formToJSON';
import myAPI from '../../util/myAPI';



export const Signing = () => {
    const [newUser, setNewUser] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [redirect, setRedirect] = useState(null);

    const handleRedirect = () => {
        console.log('Successful, so redirect')
        setRedirect('/') // to be changed to desired path
    }
    const handleNoAccount = () => {
        setNewUser(true);
    };

    const handleHasAccount = () => {
        setNewUser(false);

    }


    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('signUpForm');
        let data = formToJSON(form.elements); // Call our function to get the form data.

        console.log(data);
        if (data) {
            let email = data['email'];
            let password = data['password'];

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log(firebase.auth().currentUser.uid)
                    let userUid = firebase.auth().currentUser.uid

                    let userData = {

                        displayName: data['username']
                    }
                    let userPic = {};

                    myAPI.updateProfile(userUid, userData, userPic)
                        .then((res) => {
                            console.log('g', res);
                            return handleRedirect();
                        })
                        .catch((err) =>
                            alert(err, "Une erreur s'est produite, veuillez réessayer plus tard")
                        );
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    switch (errorCode) {
                        case 'auth/user-disabled':
                            return alert("Votre compte a été désactivé. Veuillez nous contacter pour plus d'information");
                        case 'auth/email-already-in-use':
                            return alert("Vous avez déjà un compte. Veuillez cliquer sur vous connecter");
                        case 'auth/invalid-email':
                            return alert('Cet email est invalide. Veuillez entrer un autre email');
                        case 'auth/weak-password':
                            return alert("Ce mot de passe n'est pas assez fort. Veuillez réessayer");
                        default: return alert("La création d'un compte a échoué. Veuillez réessayer plus tard");

                    };
                })
        }
    }



    return (<div className={styles.wrapper}>
        { redirect ? <Redirect to={redirect} /> : ''}

        <div className={styles.contentWrapper}>
        {newUser ? <SignUp handleSignUpSubmit={handleSignUpSubmit} handleHasAccount={handleHasAccount} />
            : <SignIn handleNoAccount={handleNoAccount} />}

        </div>
    </div>)
}