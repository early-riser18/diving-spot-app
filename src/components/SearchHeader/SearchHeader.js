import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button/Button';
import styles from './SearchHeader.module.scss';

export default class SearchHeader extends React.Component {
    render() {

        if (this.props.isMobile) {
            return (
                <div className={styles.section}>
                    <Button variant="transparent" text={<img className={styles.searchIcon} src={require('../../assets/search-icon.png')} />} />
                    <img className={`${styles.mob} ${styles.logo}`} src={require('../../assets/logo-sm.png')} />
                    <Button variant='transparent' text={<img className={styles.profileIcon} src={require('../../assets/profile-icon.png')} />} />

                </div>);
        }
        else if (this.props.isMobile === false) {
            return (
                <div className={styles.section}>
                    <img className={styles.logo} src={require('../../assets/logo-sm.png')} />
                    <Button variant='' text='SearchBar' />
                    <span>
                        <Button variant="secondary" text="Ajouter un spot" />
                        <Button variant="primary" text="Se connecter" />
                    </span>
                </div>
            );
        } else return null;
    }
}