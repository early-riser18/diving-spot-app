import React from 'react';
import { Button } from '../Button/Button';
import styles from './SearchHeader.module.scss';
import { Link } from 'react-router-dom';

export default class SearchHeader extends React.Component {

    render() {

        if (this.props.props.isMobile) {
            return (
                <div className={styles.section}>
                    <Button variant="transparent" text={<img className={styles.searchIconMob} src={require('../../assets/search-icon.png')} alt='' />} />
                    <Link to={'/'}>  <img className={styles.logoMob} src={require('../../assets/logo-sm.png')} alt='' /></Link>
                    <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} alt='' />} />

                </div>);
        }
        else if (this.props.props.isMobile === false) {
            return (
                <div className={styles.section}>
                    <Link to={'/'}>   <img className={styles.logo} src={require('../../assets/logo-sm.png')} alt='' /></Link>
                    <form>
                        <div className={styles.searchBar}>
                            <div className={`${styles.fieldContainer} ${styles.first}`}>
                                <img className={styles.searchIcon} src={require('../../assets/search-icon.png')} alt='' />

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
                        <span className={styles.short}><Button variant="transparent" text={<img className={styles.addSpot} src={require('../../assets/plus-icon-green.png')} alt='' />} /></span>
                        <span className={styles.long1}> <Button variant="primary" text="Se connecter" /></span>
                        <span className={styles.short1}> <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} alt='' />} /></span>

                    </span>
                </div>
            );
        } else return null;
    }
}