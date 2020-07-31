import React from 'react';
import styles from '../DiapoTab/DiapoTab.module.scss';
import { Button } from '../Button/Button';

export class DiapoTab extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.mainPic}><img src={require('../../assets/spotImg1png.jpg')} alt='' /></div>
                <div className={styles.sidePic}>
                    <img className={styles.side1} src={require('../../assets/spotImg2.jpg')} alt='' />
                    <img className={styles.side2} src={require('../../assets/spotImg3.jpg')} alt='' />
                </div>
                <button className={styles.btnWrapper} onClick={this.props.onClickOpen}>Voir plus</button>
            </div>
        );
    }
}