import React from 'react';
import styles from './SignUp.module.scss';

export default class SignUp extends React.Component {

   

    render() {

        return (<div className={styles.mainWrapper}>
            <h2>Créer un compte</h2>
            <div className={styles.wrapper} >
                <form id='signUpForm'>
                    <div>
                    <input className={styles.inputField} type="text" name="email" placeholder="E-mail"></input>

                    </div>
                    <div>
                    <input className={styles.inputField}  name='password' placeholder="Mot de passe"></input>
                    </div>
                    <div>
                    <input className={styles.inputField} type="text" name='username' placeholder="Nom d'utilisateur" ></input>
                    </div>

                    


                    <button className={styles.signUpBtn} onClick={this.props.handleSignUpSubmit}>Créer un compte</button>
                </form>
                
            </div>
        </div>
        )
    }
}