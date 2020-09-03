import React from 'react'
import ReactDOM from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./AddSpotForm.module.scss";


export class AddSpotForm extends React.Component {

    render() {

        return (
            <div className={styles.container} >
                <form autoComplete='on' id='addSpotForm' >
                    <div><label for="title">Nom du spot:</label><br />
                        <input type='text' name='title' required /> </div>
                    <div>
                        <label for="street">Rue la plus proche</label><br />
                        <input required type='text' name='street' />
                    </div>
                    <div>
                        <label for="city">Ville</label><br />
                        <input type='text' name='city' />
                    </div>
                    <div><label for="postalCode">Code Postal</label><br />
                        <input type='text' name='postalCode' />
                    </div>
                    <div>
                        <label for="country">Pays</label><br />
                        <input type='text' name='country' />
                    </div>

                    <div>                    <label for="image">Photo(s) du spot</label><br />
                        <input type='file' name='image' />
                    </div>
                    <div>
                        <label for="keywords">Catégories </label><br />
                        <input type='radio' name='keywords' id='fishy' value='fishy' />
                        <label for="fishy">Poissonneux</label><br />
                        <input type='radio' name='keywords' id='weakCurrent' value='weakCurrent' />
                        <label for="weakCurrent">Courant faible</label><br />
                    </div>
                    <label for="level">Niveau de difficulté:</label>

                    <div>
                        <select name="level" id="level">
                            <option value="easy">Facile</option>
                            <option value="medium">Intermédiaire</option>
                            <option value="advanded">Avancé</option>
                        </select>

                    </div>
                    <div>
                        <label for="rating">Note</label><br />
                        <input type='text' name='rating' />
                    </div>
                    <div>
                        <label for="accessPoint">Accès au spot</label><br />
                        <textarea type='text' name='accessPoint' />
                    </div>
                    <div>
                        <label for="parking">Parking le plus proche</label><br />
                        <textarea type='text' name='parking' />
                    </div>

                    <div>
                        <label for="description">Description complète</label><br />
                        <textarea type='text' name='description' />

                    </div>
                    <input type='submit' name='submit' onClick={this.props.formSubmit} />

                </form>

            </div>
        )

    }
}