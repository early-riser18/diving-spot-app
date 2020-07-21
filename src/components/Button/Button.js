import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./Button.module.scss";

export class Button extends React.Component { 

variantStyle(variant){
    return `styles.${variant}`;
}
render() {

    return (
        <button className={`${styles.btn} ${styles[this.props.variant]}`}>{this.props.text}</button>
    );
}
}

