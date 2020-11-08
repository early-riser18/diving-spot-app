import React from 'react';
import styles from "./Button.module.scss";

 export class Button extends React.Component { 

variantStyle(variant){
    return `styles.${variant}`;
}
render() {

    return (
        <button onClick={this.props.onClick} className={`${styles.btn} ${styles[this.props.variant]}`}>{this.props.text}</button>
    );
}
}

