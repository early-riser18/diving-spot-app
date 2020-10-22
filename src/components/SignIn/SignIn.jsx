import React from 'react';
const auth = require("firebase/auth");

var ui = new firebaseui.auth.AuthUI(firebase.auth());


export default class SignIn extends React.Component {

    render(){
        return(<div>
            <h1>Welcome to My Awesome App</h1>
<div id="firebaseui-auth-container"></div>
<div id="loader">Loading...</div>
        </div>
        )
    }
}