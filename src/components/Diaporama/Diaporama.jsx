import React, { Component } from 'react'
import styles from './Diaporama.module.scss';

export default class Diaporama extends Component {

   
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.navBar}>
                    <button className={styles.btnClose} onClick={this.props.onClickClose}>Fermer</button>
                    <p className={styles.imgCounter}>{this.props.index} / {this.props.spot.image.length}</p>
                </div>
                <div className={styles.imgSlideshow}>
                  <img src={this.props.content} alt='' />

                </div>
                <button className={`${styles.btnNav} ${styles.prev}`} onClick={this.props.onClickMinus}>&lt;</button>
                <button className={`${styles.btnNav} ${styles.next}`} onClick={this.props.onClickPlus}>&gt;</button>

            </div>
        )
    }
}
