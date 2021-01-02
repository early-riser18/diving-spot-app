import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as MenuBurger } from '../../assets/menu-burger1.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-Icon.svg';
import Close from '../../assets/close-icon.svg';


export const Header = (props) => {
    let addIcon = (<svg viewBox="0 0 24 24" fill="#00c535" width="24px" height="24px" ><path d="M12 2C6.478 2 2 6.478 2 11.999 2 17.522 6.478 22 12 22s10-4.478 10-10.001C22 6.478 17.522 2 12 2zm0 17.999c-4.411 0-8-3.589-8-8 0-4.41 3.589-8 8-8s8 3.59 8 8c0 4.411-3.589 8-8 8z"></path><path d="M13 7.336h-2v3.501H7.5v1.999H11v3.5h2v-3.5h3.501v-1.999H13z"></path></svg>);


    return (<div className={styles.wrapper}>

        <div className={styles.desktop}>
            <Link to={'/'}> <span>  <img className={styles.logo} src={require('../../assets/logo-sm.png')} alt='' />
                <p className={styles.title}>How To Sea</p>
            </span> </Link>


            <form className={styles.searchBarWrapper}>
                <div className={styles.searchBar}>
                    <div className={`${styles.fieldContainer} ${styles.first}`}>
                        <label for="zoneQuery">
                            <input className={styles.fieldInput} type="text" id='zoneQuery' defaultValue='Marseille' >
                            </input>
                        </label>
                    </div>
                    <div className={`${styles.fieldContainer} ${styles.second}`}>
                        <label for="keyWordQuery">
                            <select className={styles.selectedInput} name="keyWordQuery" >
                                <option value="all">Tous niveaux</option>
                                <option value="easy">Facile</option>
                                <option value="medium">Intermédiaire</option>
                                <option value="hard">Avancé</option>
                            </select>                              
                              </label>
                              <button className={styles.searchIcon}><SearchIcon /></button>
                    </div>
                </div>

            </form>





            <span className={styles.btnRow}>
                <Link to={'/add-spot'}>   <button className={`${styles.btn} ${styles.A} `}><span className={styles.btnIcon}>{addIcon}</span>Ajouter un spot</button></Link>
                <Link to={'/sign-in'}>     <button className={`${styles.btn} ${styles.B} `}>Se connecter</button></Link>

            </span>
        </div>

        <div className={styles.mobile}>
            <div className={styles.mobMenuWrapper}>
                <button onClick={props.toggleMobMenu} className={styles.menuIcon}><MenuBurger /></button>

            </div>
            <Link to={'/'}> <div className={styles.mobTitle}><img src={require('../../assets/logo-sm.png')} alt='' />
                <p >How To Sea</p>
            </div> </Link>
            <button className={styles.mobSearchIcon}><SearchIcon /></button>
        </div>

        <div className={props.overlayMenu ? `${styles.overlayMenu} ${styles.visible}` : `${styles.overlayMenu}`}>

            <span className={props.overlayMenu ? `${styles.menuBox} ${styles.boxVisible}` : `${styles.menuBox}`}>
                <div className={styles.mobCloseBtn} ><button onClick={props.toggleMobMenu}><img src={Close} alt='' /></button></div>
                <div className={styles.highlightBtn}>{props.user ? <button onClick={() => props.handleSelectedLink('/profile')} className={`${styles.btn} ${styles.B} `}>Mon profil</button>
                    : <button onClick={() => props.handleSelectedLink('/sign-in')} className={`${styles.btn} ${styles.B} `}>Se connecter</button>
                }

                </div>
                <div className={styles.optLinks}>
                    <button onClick={() => props.handleSelectedLink('/add-spot')} className={`${styles.btn} ${styles.C} `}> Ajouter un spot</button>
                    {/* Needs to be linked */} <button onClick={() => props.handleSelectedLink('')} className={`${styles.btn} ${styles.C} `}>Nous contacter</button>

                </div>

            </span>
        </div>

    </div>)
}