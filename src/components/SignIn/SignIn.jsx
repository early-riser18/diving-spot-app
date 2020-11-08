import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import firebase from "../../util/firebaseSetUp";
import styles from './SignIn.module.scss';
import formToJSON from '../../util/formToJSON';
import { ForgottenPassword } from '../ForgottenPassword/ForgottenPassword';
const firebaseui = require('firebaseui');
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// const auth = firebase.auth();
// var ui = new firebaseui.auth.AuthUI(firebase.auth());


export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
        this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleForgottenPassword(event) {
        event.preventDefault();
        this.setState({ redirect: '/mot-de-passe-oublie' });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = document.getElementById('signInForm');
        let data = formToJSON(form.elements); // Call our function to get the form data.

        console.log(data);
        if (data) {
            let email = data['email'];
            let password = data['password'];

            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                this.setState({ redirect: '/' }); // Will then be redirected to profile page by default or a continuity to where user was going
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                switch (errorCode) {
                    case 'auth/invalid-email':
                        return alert("Email invalide. Veuillez vérifier votre email.");
                    case 'auth/user-disabled':
                        return alert("Votre compte a été désactivé. Veuillez nous contacter pour plus d'information");
                    case 'auth/user-not-found':
                        return alert("Compte introuvable. Veuillez vérifier les identifiants utilisés");
                    case 'auth/wrong-password':
                        return alert("Mot de passe invalide. Veuillez vérifier votre mot de passe");
                    default: return alert("L'identification a échoué. Veuillez réessayer plus tard");

                }

            })
        }
    }

    render() {

        return (<div>
            {this.state.redirect ? <Redirect to={this.state.redirect} /> : ''}
            <h1>S'identifier</h1>


            <div className={styles.wrapper} >
                <form id='signInForm'>
                    <div>
                        <label className={styles.label} htmlFor="email">E-mail</label>
                        <input className={styles.inputField} type="text" name="email" autoComplete="true"></input>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="password">Mot de passe</label>
                        <input className={styles.inputField} type="password" name='password' autoComplete="true"></input>

                    </div>
                    <button onClick={this.handleSubmit}>Se connecter</button>
                    <button onClick={this.handleForgottenPassword} >Mot de passe oublié?</button>
                </form>
                <div className={styles.otherOption}>
                    <button onClick={this.props.handleNoAccount}>Créer un nouveau compte</button>
                </div>
                {/* <h3>S'identifier avec:</h3> */}

            </div>
        </div>
        )
    }
}