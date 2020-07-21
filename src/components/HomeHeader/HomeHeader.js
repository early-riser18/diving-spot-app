import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HomeHeader.module.scss';
import { Button } from '../Button/Button';


export class HomeHeader extends React.Component {

    render() {

        if (this.props.isMobile) {
            return (
                <div className={` ${styles.mobile} ${styles.section}`}>

                    <Button variant="transparent" text={<img className={styles.addSpot} src={require('../../assets/plus-icon-green.png')} />} />
                    <img  className={`${styles.logo} ${styles.mob}`} src={require('../../assets/logo-sm.png')} />
                    <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} />} />

                </div>
            );
        }
        else if (this.props.isMobile === false) {
            return (
                <div className={styles.section}>
                    <span><img className={styles.logo} src={require('../../assets/logo-sm.png')} />
                        <p className={styles.title}>How To Sea</p></span>
                    <span>
                        <Button variant="secondary" text="Ajouter un spot" />
                        <Button variant="primary" text="Se connecter" />
                    </span>
                </div>);
        }
    }
}


