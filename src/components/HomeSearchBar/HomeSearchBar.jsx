import React from 'react';
import styles from './HomeSearchBar.module.scss';
import { Link } from 'react-router-dom';


export class HomeSearchBar extends React.Component {
    render() {
        return (
            <div className={styles.searchContainer}>
                <form id='searchBarBig'>
                    <div className={styles.searchBar}>
                        <div className={`${styles.fieldContainer} ${styles.first}`}>
                            <label for="areaQuery">
                                <div className={styles.fieldTitle} >Zone Géographique</div>
                                <input className={styles.fieldInput} type="text" name='areaQuery' id='zoneQueryAutocomplete' placeholder='Où veux-tu plonger?' >
                                </input>
                            </label>
                        </div>


                        <div className={`${styles.fieldContainer} ${styles.second}`}>
                            <label for="keyWordQuery">
                                <div className={styles.fieldTitle}>Niveau recommendé</div>
                                <select className={styles.selectInput} name="keyWordQuery" >
                                    <option value="all">Tous niveaux</option>
                                    <option value="easy">Facile</option>
                                    <option value="medium">Intermédiaire</option>
                                    <option value="hard">Avancé</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.submitContainer}>
                                <button onClick={this.props.onClick} className={styles.submitBtn} type='submit' ><img className={styles.searchIcon} src={require('../../assets/search-icon-white.png')} alt='' />Rechercher</button>
                            
                        </div>
                    </div>
                </form>
                {/* <div className={styles.quickLinks}>
                    <div className={styles.option}><img className={styles.quickLinksLogo} src={require('../../assets/foot-icon.png')} alt=''/><button className={styles.optionBtn}>Accès à pied</button></div>
                    <div className={styles.option}><img className={styles.quickLinksLogo} src={require('../../assets/boat-icon.png')} alt='' /><button className={styles.optionBtn} >Accès en bateau</button></div>

                </div> */}
            </div>
        )
    };
}