import React from 'react'
import styles from './FormSuccessOverlay.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
export class FormSuccessOverlay extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.subwrapper}>
                    <div ><img src={require('../../assets/confirmation-icon-2.png')} alt='' /></div>

                    <div>
                        <h2>Nouveau spot ajouté avec succès!</h2>
                        <p>Merci beaucoup d'avoir contribué!<br />Ton spot a été soumis pour modération et devrait être visible d'ici 12 heures. </p>
                        <p>En attendant, tu peux aller explorer d'autres spots de plongée.</p>
                        <Link to={'/'} ><Button text="Retour au menu" /></Link>
                    </div>

                </div>

            </div>
        )
    }
}