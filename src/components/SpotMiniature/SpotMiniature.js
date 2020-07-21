import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SpotMiniature.module.scss';
import starEmpty from '../../assets/starEmpty.svg';
import starFull from '../../assets/starFull.svg';
import { Link } from 'react-router-dom';

export class SpotMiniature extends React.Component {
    renderLevel(level) {
        switch (level) {
            case 'Facile':
                return styles.easy;
            case 'Moyen':
                return styles.medium;
            case 'Difficile':
                return styles.hard;
            default: return styles.hard;
        }
    }
    renderStar(Star) {
        switch (Star) {
            case '1':
                return <div><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/></div>;
            case '2':
                return <div><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/></div>;
            case '3':
                return <div><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starEmpty}/><img className={styles.ratingStar} src={starEmpty}/></div>;
                case '4':
                    return <div><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starEmpty}/></div>;
                    case '5':
                        return <div><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/><img className={styles.ratingStar} src={starFull}/></div>;

            default: return <h4 className={styles.unavailable}>Rating not available</h4>;
        }
    }


    render() {
        return (
           <Link className={styles.spotLink} to='/user' >
           <div className={styles.spot}>
                <img className={styles.spotImg} src={require('../../assets/spotImg1png.jpg')} />
                <div className={styles.description}>
                    <h3>Calanques de Samena</h3>
                    <h4 className={styles.cutText}>Provences-Alpes-Côtes-D’Azur, France</h4>
                    <div className={styles.keyWordLevel}>
                        <h4 className={styles.cutText}>0 et 20m</h4> &nbsp;&nbsp; <p className={this.renderLevel('Facile')}>Facile</p>
                    </div>
                    <div className={styles.rating}>
                        {this.renderStar('0')}&nbsp;&nbsp;
                        <p className={styles.ratingText}>4.8 sur 5</p>&nbsp;&nbsp;
                        <p className={styles.ratingText}>(117)</p>
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}