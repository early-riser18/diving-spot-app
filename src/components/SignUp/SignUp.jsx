import React from 'react';
import styles from './SignUp.module.scss';

export default class SignUp extends React.Component {

   

    render() {

        return (<div >
            <h1>Créer un nouveau compte</h1>
            <div className={styles.wrapper} >
                <form id='signUpForm'>
                    <div>
                    <label className={styles.label} htmlFor="email">E-mail</label>
                    <input className={styles.inputField} type="text" name="email" ></input>

                    </div>
                    <div>
                    <label className={styles.label} htmlFor="password">Mot de passe</label>
                    <input className={styles.inputField} type="password" name='password' ></input>
                    </div>
                    <div>
                    <label className={styles.label} htmlFor="username">Nom d'utilisateur</label>
                    <input className={styles.inputField} type="text" name='username' ></input>
                    </div>

                    {/* <label for='profilePic'>Photo de profil</label>
                    <input type='file'></input> */}


                    <button onClick={this.props.handleSignUpSubmit}>Créer un compte</button>
                </form>
                <div>
                <button onClick={this.props.handleHasAccount}>Déjà un compte? Se connecter</button>
                </div>
            </div>
        </div>
        )
    }
}