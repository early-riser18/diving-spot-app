import React, { Component } from 'react';
import styles from './SpotDescription.module.scss';

export default class SpotDescription extends Component {
    static defaultProps = {
        spot: {
            test: 'heyhey'
        },
        satViewSrc: require('../../assets/satelliteView1.jpg'),

    }
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
                        <p>Lat: {spot.latitude}  Lng: {spot.longitude}</p>
                    </div>
                </div>



                <div className={styles.satView}>
                    <img src={this.props.spot.satViewSrc || this.props.satViewSrc} alt='' />
                </div>
                <div className="red">

                </div>
            </div>
        )
    }
}
