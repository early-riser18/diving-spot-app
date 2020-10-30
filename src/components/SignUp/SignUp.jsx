import React from 'react';
import firebase from "../../util/firebaseSetUp";
import styles from './SignUp.module.scss';
import formToJSON from '../../util/formToJSON';
const firebaseui = require('firebaseui');
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// const auth = firebase.auth();
// var ui = new firebaseui.auth.AuthUI(firebase.auth());


export default class SignUp extends React.Component {


    handleSubmit(event) {
        event.preventDefault();
        const form = document.getElementById('signUpForm');
        let data = formToJSON(form.elements); // Call our function to get the form data.

        console.log(data);
        if (data) {
            let email = data['email'];
            let password = data['password'];

            firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
                res.user.updateProfile({
                    displayName: data['username'],
                })
                .then((res) => console.log('Successfuly updated: ', res.user))
                .catch((err)=> console.error(err));                
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

    render() {
        
        return (<div className>
            <h1>Créer un nouveau compte</h1>
            <div className={styles.wrapper} >
                <form id='signUpForm'>
                    <label for="email">E-mail</label>
                    <input type="text" name="email" ></input>
                    <label for="password">Mot de passe</label>
                    <input type="password" name='password' ></input>
                    <label for="username">Nom d'utilisateur</label>
                    <input type="text" name='username' ></input>
                    <label for='profilePic'>Photo de profil</label>
                    <input type='file'></input>


                    <button onClick={this.handleSubmit}>Créer un compte</button>
                </form>
                <button onClick={this.props.handleHasAccount}>Déjà un compte? Se connecter</button>
            </div>
        </div>
        )
    }
}