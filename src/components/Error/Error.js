import React from 'react';
import styles from './Error.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export class Error extends React.Component {
    render() {

        return (<div className={styles.wrapper}>
    
            <h1>Page introuvable.</h1>
            <Link to={'/'} ><Button text="Retour au menu" /></Link>

        </div>)
    }
}