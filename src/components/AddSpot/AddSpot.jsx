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
        this.displayFormInfo = this.displayFormInfo.bind(this);
    }

    // from https://www.learnwithjason.dev/blog/get-form-values-as-json/ 
    // Used to extract values from the form and make an array
    // Loop through HTML Collection and apply array-method to it
    // Create data object and assign key-value pairs based on form elements.
    formToJSON = elements => [].reduce.call(elements, (data, element) => {

        // To assign only radio elements with a checked value and disregard others
        if (element.type == 'radio') {
            if (element.checked == true) {
                data[element.name] = element.value;
            }
            // to create an object and assign all checkbox values to it
        } else if (element.type == 'checkbox') {
            if (typeof data[element.name] == 'object') {
                data[element.name][element.value] = element.checked;

            } else { data[element.name] = { [element.value]: element.checked }; }

        } else if (element.type == 'submit') {

        } else { data[element.name] = element.value; }


        return data;
    }, {});


    formSubmit(event) {
        const form = document.getElementById('addSpotForm');
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.
        let data = this.formToJSON(form.elements); // Call our function to get the form data.
        //  delete data['submit']; // Remove the submit

        // if (this.validateForm(data) === true) { //To double check: Looks like browser required is working
        //     this.appendAuxInfo(data);
        //     let dataAsJSON = JSON.stringify(data, null, "  ");// turns it into a JSON string
        //     console.log('DATA sent to API', dataAsJSON);
        //     myAPI.postNewSpot(dataAsJSON);
        // }
    }

    validateForm(formVal) {
        // Used to check if all fields have been filled in 
        for (let i = 0; i < Object.values(formVal).length; i++) {
            if (Object.values(formVal)[i] === '') {
                alert(`${Object.keys(formVal)[i]} must be filled out`);
                return false;
            }
        }
        console.log('form_Validated')
        return true;
    }

    appendAuxInfo(formVal) {

        /*   for (let i = 0; i < Object.values(userInf).length; i++) {
               formVal[Object.keys(userInf)[i]] = Object.values(userInf)[i];
           } */
        // Organize data already collected
        formVal['keywords'] = {};
        let addToKeywords = ['depth', 'caracteristics', 'recommendedAccess', 'adaptedFor'];
        addToKeywords.map(el => {
            formVal.keywords[el] = formVal[el];
            delete formVal[el];
        });


        // Used to add user info required + default publishing status 
        formVal['author'] = this.props.userInfo.displayName;
        formVal['uid'] = this.props.userInfo.uid;
        formVal['ispublished'] = false;
        formVal['totalRating'] = 0;
        let today = new Date();
        formVal['dateCreated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        formVal['lastUpdated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        formVal['comments'] = { 'test': 'test' };

        console.log('all info in', formVal);
    }

    displayFormInfo() {
        const form = document.getElementById('addSpotForm');
        console.log(form.elements);
        console.log(this.formToJSON(form.elements));

    }
    render() {
        console.log();
        return (
            <div>
                <AddSpotForm formSubmit={this.formSubmit} />
                <button onClick={this.displayFormInfo}>Check info </button>

            </div>
        )
    }
}
