import React from 'react'
import styles from "./AddSpotForm.module.scss";
import ImgUploader from '../ImgUploader/ImgUploader';
import HintBox from '../HintBox/HintBox';

export class AddSpotForm extends React.Component {
    constructor(props) {

        super(props);
        let hintLevel = <div>Débutant = zone sans danger (haut fond, grottes, filet, transit de bateau) et conditions idéales souvent au rendez-vous (bonne visibilité, pas de courant, zone peu exposée à la houle, mise à l’eau facile).<br /><br />
        Intermédiaire = une bonne connaissance du milieu marin et des techniques d’apnée permettant sont requise car les conditions ne sont pas toujours idéales. <br /><br />
        Avancé = Zone pouvant présenter des dangers d’origines humain et nécessitant d’être vigilant à tout moment, zone exposé aux aléas du climat.
                </div>;

        let hintDescription = <div>Ajoute ici tous les éléments pouvant être utile à savoir pour les futurs plongeurs mais aussi les points d’intérêt du spot.</div>

        let hintAccessOption = <div>Comment est-ce que tu recommendes de se rendre à la zone du spot?</div>
        let hintImage = <div>Ajoute des photos qui donneront envie à d'autres plongeurs de visiter ce spot</div>
        let hintFootAccess = <div>Indique le chemin à suivre afin de se rendre jusqu’à la mise à l’eau (sentiers, distance, point particulier pour se repérer)</div>;
        let hintBoatAccess = <div>Indique le port le plus adapté/proche pour se rendre au spot, la direction à suivre, distance à parcourir et si possible les Amers ou une position par rapport à un point remarquable (ex: au Sud-Ouest de la pointe du cap…)</div>
        this.state = {
            accessByFoot: true,
            hintIcon: require('../../assets/hintIcon.png'),
            hintText: {
                level: hintLevel,
                description: hintDescription,
                spotAccess: hintAccessOption,
                image: hintImage,
                footAccess: hintFootAccess,
                boatAccess: hintBoatAccess

            }        };
        this.accessByFoot = this.accessByFoot.bind(this);



    }

    accessByFoot() {
        if (this.state.accessByFoot === true) {
            this.setState({ accessByFoot: false });
        } else {
            this.setState({ accessByFoot: true });
        }
    };

 

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
                            <label className={styles.label} for="level">Niveau recommendé
                            <HintBox icon={this.state.hintIcon} text={this.state.hintText.level}/>
                            </label>

                            <div className={styles.levelSelector}>
                                <label className={`${styles.radio} ${styles.easy}`}><input type="radio" name="level" value="easy" defaultChecked /><span>Débutant</span></label>
                                <label className={`${styles.radio} ${styles.medium}`}><input type="radio" name="level" value="medium" /><span>Intermédiaire</span></label>
                                <label className={`${styles.radio} ${styles.hard}`}><input type="radio" name="level" value="hard" /><span>Avancé</span></label>

                            </div>
                            <div>
                                <label className={styles.label} for="description">Description détaillé du spot
                                <HintBox icon={this.state.hintIcon} text={this.state.hintText.description}/></label><br />
                                <textarea className={styles.textarea} type='text' name='description' placeholder="Ex: Plage à la sortie, zone ombragée, mise à l’eau facile, tombants, grottes, tunnels, épaves, organisme vivant remarquable…" />

                            </div>
                            <div className={styles.keywords}>
                                <h4>Catégories </h4 ><br />
                                <h4>Profondeur moyenne</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth0' value='0 to 9m' defaultChecked />
                                        <label className={styles.label} for="depth">0 à 9m</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth1' value='10 to 19m' />
                                        <label className={styles.label} for="depth">10 à 19m</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth2' value='20 to 39m' />
                                        <label className={styles.label} for="depth">20 à 39m</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='depth' id='depth3' value='40m and more' />
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


                                <label className={styles.label}>Accès recommendé <HintBox icon={this.state.hintIcon} text={this.state.hintText.spotAccess}/></label>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='recommendedAccess' id='recommendedAccess0' value='foot' defaultChecked onChange={this.accessByFoot} />
                                        <label className={styles.label} for="recommendedAccess">À pied</label>
                                    </div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='recommendedAccess' id='recommendedAccess1' value='boat' onChange={this.accessByFoot} />
                                        <label className={styles.label} for="recommendedAccess">En bateau</label>
                                    </div>
                                </div>

                                <h4>Adapté pour</h4>
                                <div>
                                    <div>
                                        <input className={styles.inputRadio} type='radio' name='adaptedFor' id='adaptedFor0' value='all' defaultChecked />
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


                        </div>

                    </div>
                    <div>
                        <h3>Comment s'y rendre</h3>
                        <div className={styles.coGeo}>
                            <label className={styles.label}>Coordonnées géographiques</label>
                            <div className={styles.inputSplit1}>
                                <div>
                                    <label className={styles.label} for="longitude">Longitude</label><br />
                                    <input className={styles.inputField} placeholder="Ex: 52.354600" required type='number' name='longitude' />
                                </div>
                                <div>
                                    <label className={styles.label} for="latitude">Latitude</label><br />
                                    <input className={styles.inputField} placeholder="Ex: 4.823405" required type='text' name='latitude' />
                                </div>
                            </div>
                            <p className={styles.caption} >Cliquez droit et choisissez "Plus d'infos sur cet endroit" avec <a href="https://www.google.com/maps/" target="_blank">Google Maps</a> pour déterminer les coordonnées géographiques</p>
                        </div>
                        <div>
                            <label className={styles.label} for="street">Rue la plus proche</label><br />
                            <input className={styles.inputField} required type='text' name='street' />
                        </div>

                        <div className={styles.inputSplit2}>

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
                            <label className={styles.label} for="accessPoint">Accès au spot <HintBox icon={this.state.hintIcon} text={this.state.accessByFoot ? this.state.hintText.footAccess : this.state.hintText.boatAccess}/></label><br />
                            <textarea className={styles.textarea} type='text' name='accessPoint' placeholder={this.state.accessByFoot ?
                                "Ex: Suivre le chemin débutant à gauche pendant 300m; Pour trouver la grotte sous-marine, longer la côte jusqu’à une faille puis la suivre jusqu'au…" :
                                "À la sortie du port, mettre cap direction Sud-Ouest et se positionner grâce aux Amers suivants… "} />
                        </div>
                        <div>
                            <label className={styles.label} for="parking">{this.state.accessByFoot ? 'Parking' : 'Port'} le plus proche </label><br />
                            <textarea className={styles.textarea} type='text' name='parking' placeholder={this.state.accessByFoot ?
                                "Ex: Vous pouvez vous garer dans la rue de Paris qui est gratuite ou au parking de la Mairie payant mais plus proche du départ du sentier…" :
                                "Ex: Vous pouvez louer un bateau depuis le port de Cassis situé à 2km du spot…"} />
                        </div>



                    </div> 
                    <div className={styles.imageContainer}>
                        <label className={styles.label} for="image" >Photo(s) du spot <HintBox icon={this.state.hintIcon} text={this.state.hintText.image} /></label>
                        <p className={styles.caption}>Jusqu’à 10 photos. Max 1MB</p>
                        <ImgUploader currentImgUploaded={this.props.currentImgUploaded} imgURLUpload={this.props.imgURLUpload} imgURLDelete={this.props.imgURLDelete}/>
                    </div>
                    <div className={styles.submitContainer}>
                        <p className={styles.caption}>En continuant, vous accepetez notre Politique de Confidentialité ainsi que nos Conditions d'Utilisations.</p>
                        <button type='submit' name='submit' onClick={this.props.formSubmit}>Ajouter ce spot</button>
                    </div>

                </form>

            </div>
        )

    }
}