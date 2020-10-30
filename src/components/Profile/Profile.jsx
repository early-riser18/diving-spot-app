import styles from './Profile.module.scss';
import React, { useState, useRef, useEffect} from 'react';
import firebase from '../../util/firebaseSetUp';
import { Redirect, Link } from 'react-router-dom';


export function Profile(props) {

    const [redirect, setRedirect] = useState(null);

 const handleSignOut = (event) => {
event.preventDefault();
firebase.auth().signOut().then(() => setRedirect('/'));

}

return (<div>
            { redirect ? <Redirect to={redirect} /> : ''}

    <button onClick={handleSignOut}>Se déconnecter</button>
</div>)

}