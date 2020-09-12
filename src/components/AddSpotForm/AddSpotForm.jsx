import React from 'react'
import ReactDOM from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./AddSpotForm.module.scss";
import Map from '../../util/Map';


export class AddSpotForm extends React.Component {

    render() {

        return (
            <div className={styles.container}>
                <h2>Ajouter un nouveau spot</h2>

                <form className={styles.formContainer} autoComplete='on' id='addSpotForm' >

                    <div>
                        <h3>A propos du spot</h3>
                        <div>
                            <label className={styles.label} for="title">Nom du spot</label><br />
                            <input className={styles.inputField} type='text' name='title' required />
                        </div>
                        <div>
                            <label className={styles.label} for="level">Niveau recommendé[i]</label>
                            <div className={styles.levelSelector}>
                                <label className={`${styles.radio} ${styles.easy}`}><input type="radio" name="level" value="easy" /><span>Débutant</span></label>
                                <label className={`${styles.radio} ${styles.medium}`}><input type="radio" name="level" value="medium" /><span>Intérmediaire</span></label>
                                <label className={`${styles.radio} ${styles.hard}`}><input type="radio" name="level" value="hard" /><span>Avancé</span></label>

                            </div>
                            <div>
                                <label className={styles.label} for="description">Description détaillé du spot[i]</label><br />
                                <textarea className={styles.textarea} type='text' name='description' />

                            </div>
                            <div className={styles.keywords}>
                                <label className={styles.label} for="keywords">Catégories[i] </label><br />
                                <h4>Profondeur moyenne</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth0' value='0 to 19m' checked="checked" />
                                        <label className={styles.label} for="depth">0 à 19m</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth1' value='20 to 39m' />
                                        <label className={styles.label} for="depth">20 à 39m</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth2' value='40m and more' />
                                        <label className={styles.label} for="depth">40m et plus</label>
                                    </div>
                                </div>

                                <h4>Caractéristiques</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputBox} type='checkbox' name='caracteristics' id='fishy' value='fishy' />
                                        <label className={styles.label} for="caracteristics">Poissonneux</label>

                                    </div>
                                    <div>
                                        <input className={styles.inputBox} type='checkbox' name='caracteristics' id='reef' value='reef' />
                                        <label className={styles.label} for="caracteristics">Récif</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputBox} type='checkbox' name='caracteristics' id='shipwreck' value='shipwreck' />
                                        <label className={styles.label} for="caracteristics">Épave</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputBox} type='checkbox' name='caracteristics' id='wall' value='wall' />
                                        <label className={styles.label} for="caracteristics">Plongée sur tombant</label>
                                    </div>
                                </div>


                                <h4>Accès recommendé</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='recommendedAccess' id='recommendedAccess0' value='foot' checked="checked"/>
                                        <label className={styles.label} for="recommendedAccess">À pied</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='recommendedAccess' id='recommendedAccess1' value='boat' />
                                        <label className={styles.label} for="recommendedAccess">En bateau</label>
                                    </div>
                                </div>

                                <h4>Adapté pour</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='adaptedFor' id='adaptedFor0' value='all' checked="checked" />
                                        <label className={styles.label} for="adaptedFor">Tous</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='adaptedFor' id='adaptedFor1' value='scubaDiving' />
                                        <label className={styles.label} for="adaptedFor">Plongée bouteille</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='adaptedFor' id='adaptedFor2' value='snorkeling' />
                                        <label className={styles.label} for="adaptedFor">Apnée/Snorkeling</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className={styles.label} for="image">Photo(s) du spot[i]</label><br />
                                <input className={styles.inputField} type='file' name='image' />
                            </div>

                        </div>

                    </div>
                    <div>
                        <h3>Comment s'y rendre</h3>
                        <div className={styles.coGeo}>
                            <label className={styles.label}>Coordonnées géographiques</label>
                            <div className={styles.inputFieldSplit1}>
                                <div>
                                    <label className={styles.label} for="longitude">Longitude</label><br />
                                    <input className={styles.inputField} placeholder="Ex: 52.354600" required type='text' name='street' />
                                </div>
                                <div>
                                    <label className={styles.label} for="latitude">Latitude</label><br />
                                    <input className={styles.inputField} placeholder="Ex: 4.823405" required type='text' name='street' />
                                </div>
                            </div>
                            <p className={styles.caption} >Cliquez droit et choisissez "Plus d'infos sur cet endroit" avec <a href="https://www.google.com/maps/" target="_blank">Google Maps</a> pour déterminer les coordonnées géographiques</p>
                        </div>
                        <div>
                            <label className={styles.label} for="street">Rue la plus proche</label><br />
                            <input className={styles.inputField} required type='text' name='street' />
                        </div>

                        <div className={styles.inputFieldSplit2}>

                            <div>
                                <label className={styles.label} for="city">Ville</label><br />
                                <input className={styles.inputField} type='text' name='city' />
                            </div>
                            <div><label className={styles.label} for="postalCode">Code Postal</label><br />
                                <input className={styles.inputField} type='text' name='postalCode' />
                            </div>
                        </div>
                        <div>
                            <label className={styles.label} for="country">Pays</label><br />
                            <input className={styles.inputField} type='text' name='country' />
                        </div>
                        <div>
                            <label className={styles.label} for="accessPoint">Accès au spot [i]</label><br />
                            <textarea className={styles.textarea} type='text' name='accessPoint' />
                        </div>
                        <div>
                            <label className={styles.label} for="parking">Parking le plus proche[i]</label><br />
                            <textarea className={styles.textarea} type='text' name='parking' />
                        </div>


                        <input className={styles.inputField} type='submit' name='submit' onClick={this.props.formSubmit} />

                    </div>




                </form>

            </div>
        )

    }
}