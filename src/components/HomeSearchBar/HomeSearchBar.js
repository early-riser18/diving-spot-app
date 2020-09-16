import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HomeSearchBar.module.scss';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


export class HomeSearchBar extends React.Component {
    render() {
        return (
            <div className={styles.searchContainer}>
                <form>
                    <div className={styles.searchBar}>
                        <div className={`${styles.fieldContainer} ${styles.first}`}>
                            <label for="zoneQuery">
                                <div className={styles.fieldTitle} >Zone Géographique</div>
                                <input className={styles.fieldInput} type="text" id='zoneQuery' placeholder='Où veux-tu plonger?' >
                                </input>
                            </label>
                        </div>
                        <div className={`${styles.fieldContainer} ${styles.second}`}>
                            <label for="keyWordQuery">
                                <div className={styles.fieldTitle}>Catégorie / Mot-Clé</div>
                                <input className={styles.fieldInput} type='text' id='keyWordQuery' placeholder="Récif, Grotte, Épave..." ></input>
                            </label>
                        </div>
                        <div className={styles.submitContainer}>
                            <Link to={'/search'}>
                            <button className={styles.submitBtn} type='submit' ><img className={styles.searchIcon} src={require('../../assets/search-icon-white.png') } />Rechercher</button>
                            </Link>
                        </div>
                    </div>
                </form>
                <div className={styles.quickLinks}>
                    <div className={styles.option}><img className={styles.quickLinksLogo} src={require('../../assets/foot-icon.png')} /><button className={styles.optionBtn}>Accès à pied</button></div>
                    <div className={styles.option}><img className={styles.quickLinksLogo} src={require('../../assets/boat-icon.png')} /><button className={styles.optionBtn} >Accès en bateau</button></div>

                </div>
            </div>
        )
    };
}