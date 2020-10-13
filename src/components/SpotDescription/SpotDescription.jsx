import React, { Component } from 'react';
import styles from './SpotDescription.module.scss';

export default class SpotDescription extends Component {
    render() {
        let spot = this.props.spot;
        return (
            <div className={styles.wrapper}>
                <div className={styles.description}>
                    <div>
                    <h2>Description du spot</h2>
                    <p> {spot.description}</p>
                    </div>
                    <div>
                    <h5>Accès au spot</h5>
                        <p>{spot.accessPoint}</p>

                    </div>
                    <div>
                        <h5>Coordonées géographiques</h5>
                        <p>Longitude: {spot.longitude}  Latitude: {spot.latitude}</p>
                    </div>
                </div>



                <div className={styles.satView}>
                    <img src={require('../../assets/satelliteView1.jpg')} alt='' />
                </div>
                <div className="red">

                </div>
            </div>
        )
    }
}
