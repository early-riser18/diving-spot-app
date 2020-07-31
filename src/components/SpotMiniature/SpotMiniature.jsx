import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SpotMiniature.module.scss';

import { Link } from 'react-router-dom';
import renderLevel from '../../util/renderLevel';
import renderStar from '../../util/renderStar';
export class SpotMiniature extends React.Component {
 
    


    render() {
        return (
           <Link className={styles.spotLink} to='/user' >
           <div className={styles.spot}>
                <img className={styles.spotImg} src={require('../../assets/spotImg1png.jpg')} />
                <div className={styles.description}>
                    <h3>Calanques de Samena</h3>
                    <h4 className={styles.cutText}>Provences-Alpes-Côtes-D’Azur, France</h4>
                    <div className={styles.keyWordLevel}>
                        <h4 className={styles.cutText}>0 et 20m</h4> &nbsp;&nbsp; <p className={renderLevel('Facile')}>Facile</p>
                    </div>
                    <div className={styles.rating}>
                        {renderStar(5)}&nbsp;&nbsp;
                        <p className={styles.ratingText}>4.8 sur 5</p>&nbsp;&nbsp;
                        <p className={styles.ratingText}>(117)</p>
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}