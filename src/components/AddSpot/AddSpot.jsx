import React from 'react'
import ReactDOM from 'react-dom';
import styles from "./AddSpot.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { AddSpotForm } from '../AddSpotForm/AddSpotForm';
import myAPI from '../../util/myAPI';

export class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotImgFile: {}

        };
        this.formToJSON = this.formToJSON.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.appendAuxInfo = this.appendAuxInfo.bind(this);
        this.displayFormInfo = this.displayFormInfo.bind(this);
        this.handleImgUpload = this.handleImgUpload.bind(this);
        this.handleImgDelete = this.handleImgDelete.bind(this);

    }

    handleImgUpload(newName, newFile) {
        console.log('in Add Spot - newFile: ',newFile);
        this.setState(prevState => ({
            spotImgFile: { ...prevState.spotImgFile, [newName]: newFile }
        }));
    }

    handleImgDelete(imgKey) {
        let newUrlObj = new Object;
        newUrlObj = this.state.spotImgFile;
        delete newUrlObj[imgKey];
        this.setState({ spotImgFile: newUrlObj });
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

        } else if (element.type == 'submit' || element.type == 'file') {

        } else {
            data[element.name] = element.value;
        }
        return data;
    }, {});


    formSubmit(event) {
        const form = document.getElementById('addSpotForm');
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.
        let data = this.formToJSON(form.elements); // Call our function to get the form data.

        if (this.validateForm(data) === true) { //To double check: Looks like browser required is working
            this.appendAuxInfo(data);
            let dataAsJSON = JSON.stringify(data, null, "  ");// turns it into a JSON string
            let spotImgFileForJSON = {};
        

            // Reassign File Object as a regular object so it can be stringified
            for (var i = 0; i < Object.keys(this.state.spotImgFile).length; i++){
               let file = {
                    lastModified: Object.values(this.state.spotImgFile)[i].lastModified,
                    lastModifiedDate: Object.values(this.state.spotImgFile)[i].lastModifiedDate,
                    name: Object.values(this.state.spotImgFile)[i].name,
                    size: Object.values(this.state.spotImgFile)[i].size,
                    type: Object.values(this.state.spotImgFile)[i].type,
                    webkitRelativePath: Object.values(this.state.spotImgFile)[i].webkitRelativePath
                };
                spotImgFileForJSON[Object.keys(this.state.spotImgFile)[i]] = file;
            }

            let spotImgFileAsJSON = JSON.stringify(spotImgFileForJSON, null, "  ")
            console.log('DATA sent to API', dataAsJSON);
            myAPI.postNewSpot(dataAsJSON, spotImgFileAsJSON);
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
        console.log('form_Validated')
        return true;
 }

    appendAuxInfo(formVal) {

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
        console.log('blob',);

    }
    render() {
        console.log('On Render current state is: ', this.state.spotImgFile);
        return (
            <div>
                <AddSpotForm formSubmit={this.formSubmit}
                    currentImgUploaded={this.state.spotImgFile} imgURLUpload={this.handleImgUpload} imgURLDelete={this.handleImgDelete}
                />
                <button onClick={this.displayFormInfo}>Check info </button>

            </div>
        )
    }
}
