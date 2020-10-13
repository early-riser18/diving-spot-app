import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button/Button';
import styles from './SearchHeader.module.scss';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export default class SearchHeader extends React.Component {

    render() {
        let wid = window.innerWidth;

        window.onresize = getBrowserWidth;

        function getBrowserWidth() {
            wid = window.innerWidth;
        }
        if (this.props.isMobile) {
            return (
                <div className={styles.section}>
                    <Button variant="transparent" text={<img className={styles.searchIconMob} src={require('../../assets/search-icon.png')} />} />
                    <Link to={'/'}>  <img className={styles.logoMob} src={require('../../assets/logo-sm.png')} /></Link>
                    <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} />} />

                </div>);
        }
        else if (this.props.isMobile === false) {
            return (
                <div className={styles.section}>
                   <Link to={'/'}>   <img className={styles.logo} src={require('../../assets/logo-sm.png')} /></Link>
                    <form>
                        <div className={styles.searchBar}>
                            <div className={`${styles.fieldContainer} ${styles.first}`}>
                                <img className={styles.searchIcon} src={require('../../assets/search-icon.png')} />

                                <label for="zoneQuery">
                                    <input className={styles.fieldInput} type="text" id='zoneQuery' defaultValue='Marseille' >
                                    </input>
                                </label>
                            </div>
                            <div className={`${styles.fieldContainer} ${styles.second}`}>
                                <label for="keyWordQuery">
                                    <input className={styles.fieldInput} type='text' id='keyWordQuery' defaultValue="Tous" ></input>
                                </label>
                            </div>
                        </div>
                    </form>
                    <span className={styles.sideBtn}>
                        <span className={styles.long}><Button variant="secondary" text="Ajouter un spot" /></span>
                        <span className={styles.short}><Button variant="transparent" text={<img className={styles.addSpot} src={require('../../assets/plus-icon-green.png')} />} /></span>
                        <span className={styles.long1}> <Button variant="primary" text="Se connecter" /></span>
                        <span className={styles.short1}> <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} />} /></span>

                    </span>
                </div>
            );
        } else return null;
    }
}