import React from 'react';
import styles from '../DiapoTab/DiapoTab.module.scss';

export class DiapoTab extends React.Component {
    static defaultProps = {
        spotImg: []
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.mainPic}><img src={this.props.spotImg[0]} alt='' /></div>
                <div className={styles.sidePic}>
                    <img className={styles.side1} src={this.props.spotImg[1]} alt='' />
                    <img className={styles.side2} src={this.props.spotImg[2]} alt='' />
                </div>
                <button className={styles.btnWrapper} onClick={this.props.onClickOpen}>Voir plus</button>
            </div>
        );
    }
}