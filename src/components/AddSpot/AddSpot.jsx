import React from 'react'
import { AddSpotForm } from '../AddSpotForm/AddSpotForm';
import { Redirect } from 'react-router-dom';
import myAPI from '../../util/myAPI';
import styles from './AddSpot.module.scss';
export class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotImgFile: [],
            successfulSubmit: false,
            redirect: null

        };
        this.formToJSON = this.formToJSON.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.appendAuxInfo = this.appendAuxInfo.bind(this);
        this.handleImgUpload = this.handleImgUpload.bind(this);
        this.handleImgDelete = this.handleImgDelete.bind(this);
        this.formReset = this.formReset.bind(this);
    }

    handleImgUpload(newFile) {
        this.setState(prevState => ({
            spotImgFile: [...prevState.spotImgFile, newFile]
        }));
    }

    handleImgDelete(imgName) {
        let myArr = this.state.spotImgFile;
        myArr.forEach((val, index, arr) => {
            if (val.name === imgName) {
                arr.splice(index, 1);
            }
        })
        this.setState({ spotImgFile: myArr });
    }


    // from https://www.learnwithjason.dev/blog/get-form-values-as-json/ 
    // Used to extract values from the form and make an array
    // Loop through HTML Collection and apply array-method to it
    // Create data object and assign key-value pairs based on form elements.
    formToJSON = elements => [].reduce.call(elements, (data, element) => {

        // To assign only radio elements with a checked value and disregard others
        if (element.type === 'radio') {
            if (element.checked === true) {
                data[element.name] = element.value;
            }
            // to create an object and assign all checkbox values to it
        } else if (element.type === 'checkbox') {
            if (typeof data[element.name] === 'object') {
                data[element.name][element.value] = element.checked;

            } else { data[element.name] = { [element.value]: element.checked }; }

        } else if (element.type === 'submit' || element.type === 'file') {

        } else {
            data[element.name] = element.value;
        }
        return data;
    }, {});


    formSubmit(event) {
        event.preventDefault();

        const form = document.getElementById('addSpotForm');
        let data = this.formToJSON(form.elements); // Call our function to get the form data.

        if (this.validateForm(data) === true) { //To double check: Looks like browser required is working
            myAPI.uploadSpotImage(this.state.spotImgFile).then(arrLink => {
                this.appendAuxInfo(data, arrLink);
                console.log('All the data sent to myAPI.postNewSpot(): ', data);
                myAPI.postNewSpot(data).then(res =>
                    res.ok ?
                        this.handleSubmitSuccess()
                        : this.handleSubmitFailure(res, this.state.spotImgFile)
                )
            })
        }
    }
    formReset() {
        const form = document.getElementById('addSpotForm');
        form.reset();
    }

    handleSubmitSuccess() {
        this.setState({ redirect: '/form-successfully-submited' })
    }

    handleSubmitFailure(res, file) {
        if (res.constructor.name === 'TypeError'){
            alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
        } else {
            res.json().then(res =>
                alert(res.message));
            
                myAPI.cancelUploadSpotImage(file).then(res =>{
                    console.log(res);
                    if (typeof res === 'array'){
                        console.log('deleted successfully');
                    } else {
                        console.log('didn\'t delete successfully')
                    }
                });
        }
        
    }
    // Used to check if all fields have been filled in 
    validateForm(formVal) {
        for (let i = 0; i < Object.values(formVal).length; i++) {
        //     if (Object.values(formVal)[i] === '') {
        //         alert(`${Object.keys(formVal)[i]} must be filled out`);
        //         return false;
        //     }
         }
        // console.log('form_Validated') 
        return true;
    }

    appendAuxInfo(formVal, arrImgLink) {

        // Organize data already collected
        formVal['keywords'] = {};
        let addToKeywords = ['depth', 'caracteristics', 'recommendedAccess', 'adaptedFor'];

        addToKeywords.forEach((val) => {
            formVal.keywords[val] = formVal[val];
            delete formVal[val];
        });

        formVal['image'] = arrImgLink;
        // Used to add user info required + default publishing status 
        formVal['author'] = this.props.userInfo.displayName;
        formVal['uid'] = this.props.userInfo.uid;
        formVal['ispublished'] = false;
        formVal['totalRating'] = 0;
        let today = new Date();
        formVal['dateCreated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
        formVal['lastUpdated'] = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    }




    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log('On Render current state is: ', this.state.spotImgFile);
        return (
            <div className={styles.wrapper}>
                <AddSpotForm formSubmit={this.formSubmit}
                    currentImgUploaded={this.state.spotImgFile} imgURLUpload={this.handleImgUpload} imgURLDelete={this.handleImgDelete}
                />
            </div>
        )
    }
}
