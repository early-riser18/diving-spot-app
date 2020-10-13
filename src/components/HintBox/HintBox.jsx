import React from 'react'
import styles from './HintBox.module.scss';


export default class HintBox extends React.Component {

    render() {
      return (
        <div className={styles.hint}>
        <img src={this.props.icon} />
        <div className={styles.hintBox}>{this.props.text}</div>
    </div>
 
      )
    }

}