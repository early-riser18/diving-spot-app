import React from 'react'
import ReactDOM from 'react-dom';
import styles from "./AddSpot.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { AddSpotForm } from '../AddSpotForm/AddSpotForm';
import myAPI from '../../util/myAPI';

export class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formToJSON = this.formToJSON.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.appendAuxInfo = this.appendAuxInfo.bind(this);
    }

    // from https://www.learnwithjason.dev/blog/get-form-values-as-json/ -- Unable to understand tho
    // Used to extra values from the form and make an array
    formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});


    formSubmit(event) {
        const form = document.getElementById('addSpotForm');
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.
        let data = this.formToJSON(form.elements); // Call our function to get the form data.
        delete data.submit; // Remove the submit

        if (this.validateForm(data) === true) {
            this.appendAuxInfo(data, this.props.userInfo);
            let dataAsJSON = JSON.stringify(data, null, "  ");// turns it into a JSON string
            myAPI.postNewSpot(dataAsJSON);
        }
    }

    validateForm(formVal) {
        // Used to check if all fields have been filled in 
        for (let i = 0; i < Object.values(formVal).length; i++) {
            if (Object.values(formVal)[i] === '') {
                alert(`${Object.keys(formVal)[i]} must be filled out`);
                return false;
            }
        }
        return true;
    }

    appendAuxInfo(formVal, userInf) {

        /*   for (let i = 0; i < Object.values(userInf).length; i++) {
               formVal[Object.keys(userInf)[i]] = Object.values(userInf)[i];
           } */

        // Used to add user info required + default publishing status
        formVal['author'] = this.props.userInfo.displayName;
        formVal['uid'] = this.props.userInfo.uid;
        formVal['ispublished'] = false;
        formVal['totalRating'] = 1;
        formVal['ispublished'] = false;
        let today = new Date();
        formVal['dateCreated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        formVal['lastUpdated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        formVal['comments'] = {};

        console.log('all info in', formVal);
    }

    render() {
        console.log();
        return (
            <div>
                <AddSpotForm formSubmit={this.formSubmit} />
            </div>
        )
    }
}
