import React, { Component } from 'react';
import styles from './SpotDescription.module.scss';

export default class SpotDescription extends Component {
    render() {
        let spot = this.props.spot;
        return (
            <div className={styles.wrapper}>
                <div className={styles.description}>
                    <h2>Description du spot</h2>
                    <p>Ce lieu de plongée est splendide. Il est habrité entre le port et la digue ce qui permet d’apprécier les algues et les poissons. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> <br />Praesent at euismod sem, dictum dapibus ligula. Proin fringilla iaculis lorem, vel bibendum sapien gravida sit amet. Pellentesque vehicula pulvinar odio, in cursus dui semper ac.<br /><br />Fusce nec laoreet arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    {/*spot.description*/}</p>
                </div>
                <div className={styles.satView}>
                    <img src={require('../../assets/satelliteView1.jpg')} alt='' />
                </div>

            </div>
        )
    }
}
