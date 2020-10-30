import React from 'react';
import styles from './HomeHeader.module.scss';
import { Button } from '../Button/Button';
import {  Link } from 'react-router-dom';


export class HomeHeader extends React.Component {

    render() {

        if (this.props.props.isMobile) {
            return (
                <div className={` ${styles.mobile} ${styles.section}`}>

                    <Button variant="transparent" text={<img className={styles.addSpot} src={require('../../assets/plus-icon-green.png')} alt='' />} />
                   <Link to={'/'}> <img  className={`${styles.logo} ${styles.mob}`} src={require('../../assets/logo-sm.png')} alt='' /></Link>
                    <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} alt=''/>} />

                </div>
            );
        }
        else if (this.props.props.isMobile === false) {
            return (
                <div className={styles.section}>
                    <span> <Link to={'/'}> <img className={styles.logo} src={require('../../assets/logo-sm.png')} alt=''/></Link>
                        <p className={styles.title}>How To Sea</p></span>
                    <span>
                       <Link to={'/add-spot'}> <Button variant="secondary" text="Ajouter un spot" /></Link>
                      { this.props.props.isSignedIn ? <Link to={'/profile'}><Button variant="primary" text='Profil'></Button></Link>
                      : <Link to={'/sign-in'}> <Button variant="primary" text="Se connecter" /></Link> 
                    }
                    </span>
                </div>);
        }
    }
}


