import React from 'react'
import { AddSpotForm } from '../AddSpotForm/AddSpotForm';
import { Redirect } from 'react-router-dom';
import myAPI from '../../util/myAPI';
import styles from './AddSpot.module.scss';
import formToJSON from '../../util/formToJSON';
export class AddSpot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotImgFile: [],
            successfulSubmit: false,
            redirect: null

        };
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



    formSubmit(event) {
        event.preventDefault();
        if (this.props.isSignedIn) {
            const form = document.getElementById('addSpotForm');
            let data = formToJSON(form.elements); // Call our function to get the form data.

            if (this.validateForm(data) === true) { 
                myAPI.uploadSpotImage(this.state.spotImgFile, data.latitude).then(arrLink => {
                    this.appendAuxInfo(data, arrLink);
                    myAPI.postNewSpot(data).then(res =>
                        res.ok ?
                            this.handleSubmitSuccess()
                            : this.handleSubmitFailure(res, this.state.spotImgFile)
                    )
                })
            }
        } else {
            alert('Veuillez verifier que vous êtes connecté')
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
            if (Object.values(formVal)[i] === '') {
                alert(`Veuillez remplir la case: ${Object.keys(formVal)[i]}`);
                return false;
            }
         }
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
