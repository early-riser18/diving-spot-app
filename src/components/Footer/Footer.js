import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Footer.module.scss';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export class Footer extends React.Component {

    render() {
        return (
            <footer className={styles.footerContainer}>

                <ul className={styles.list1}>
                    <li>Accueil</li>
                    <li>Ajouter un spot</li>
                    <li>Mon Profil</li>
                    <li>Nous contacter</li>
                </ul>

                <ul className={styles.list2}>
                    <li>Conditions d'utilisation</li>
                    <li>Politique de confidentialité</li>
                    <li>Reporter un problème</li>
                    <li>Changer de langue</li>
                </ul>

                <ul className={styles.list3}>
                    <li>©2020 How-To-Sea</li>
                    <li>Tous droits réservés</li>
                    <li><img className={styles.footerLogo} src={require('../../assets/logo-sm.png')} /></li>
                </ul>

            </footer>
        )
    }
}