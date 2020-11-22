import React from 'react';
import styles from './SpotMainInfo.module.scss';
import { Button } from '../Button/Button';
import starFull from '../../assets/starFull.svg';
import { DiapoTab } from '../DiapoTab/DiapoTab';
import renderLevel from '../../util/renderLevel';
import { Link } from 'react-router-dom';
import translateKeywords from '../../util/translateKeywords';
import dataToDisplay from '../../util/dataToDisplay';

export class SpotMainInfo extends React.Component {
   

    render() {
        let spot = this.props.spot;
        let recommendedAccess;
        if (spot.keywords.recommendedAccess === 'foot') {
            recommendedAccess = 'Parking publique le plus proche'
        } else {
            recommendedAccess = "Port le plus proche";
        }

        return (
            <div>
                <Link to='/search'>
                    <Button variant='fourth' text='Retour aux résultats' />

                </Link>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2>{spot.title}</h2>
                        {/* <Button variant='secondary' text='Editer' /> Need to add Edit Icon here */}
                    </div>
                    <div className={styles.subheader}>
                        <h4>Ajouté par:&nbsp;<span className={styles.bold}>{spot.author}</span></h4>
                   &nbsp;&nbsp;&nbsp;&nbsp; <h4>Dernière mise-à-jour le:&nbsp;<span className={styles.bold}>{spot.lastUpdated}&nbsp;&nbsp;&nbsp;</span></h4>
                   <span><img className={styles.starRating} src={starFull} alt='' /><p className={styles.rating}>&nbsp;{spot.rating ? `${spot.rating} sur 5 (${spot.totalRating})` : 'Aucun avis disponible'}</p></span>

                    </div>

                    <div className={styles.imgAccess}>
                        <div className={styles.tempPlace}> <DiapoTab spotImg={spot.image} onClickOpen={this.props.onClickOpen} /></div>
                        <div className={styles.accessInfo}>

                            <h5>Rue la plus proche</h5>
                            <p>{spot.street},<br />{spot.city}, {spot.postalCode}, {spot.country}</p>
                            <h5>{recommendedAccess}</h5>
                            <p>{spot.parking}</p>
                        </div>
                    </div>

                    <div className={styles.ratingKeyWordLevel}>
                        <span className={styles.allKeywords}><h4>Catégories:&nbsp;&nbsp;</h4>
                            <p className={styles.keywordsArr}>{dataToDisplay.caracteristics(spot.keywords.caracteristics)
                            .map(e => {
                                return <div>{e} -&nbsp;</div>
                            })}
                           &nbsp;{spot.keywords.depth} -
                          &nbsp;Adapté pour {dataToDisplay.adaptedFor(spot.keywords.adaptedFor)} -&nbsp;
                          
                          </p>
                            <p className={renderLevel(spot.level)}>{translateKeywords.level(spot.level)}</p>
                        </span>

                      

                    </div>

                </div>

            </div>);
    }
}