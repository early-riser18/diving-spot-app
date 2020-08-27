import React from 'react';
import styles from './SpotMainInfo.module.scss';
import { Button } from '../Button/Button';
import starFull from '../../assets/starFull.svg';
import { DiapoTab } from '../DiapoTab/DiapoTab';
import renderLevel from '../../util/renderLevel';
    


export class SpotMainInfo extends React.Component {

    render() {
        let spot = this.props.spot;
        return (
        <div>
            <Button variant='fourth' text='Retour aux résultats' />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2>{spot.name}</h2>
                    <Button variant='secondary' text='Editer' /> {/* Need to add Edit Icon here */}
                </div>
                <div className={styles.subheader}>
                    <h4>Ajouté par:&nbsp;<span className={styles.bold}>{spot.author}</span></h4>
                   &nbsp;&nbsp;&nbsp;&nbsp; <h4>Dernière mise-à-jour le:&nbsp;<span className={styles.bold}>{spot.lastUpdated}</span></h4>
                </div>

                <div className={styles.imgAccess}>
                    <div className={styles.tempPlace}> <DiapoTab onClickOpen={this.props.onClickOpen} /></div>
                    <div className={styles.accessInfo}>
                        <h5>Accès au spot</h5>
                        <p>Départ à l’eau à 30m au sud de la capitainerie du port de Marseille<br/><br/>Accès à pied en 5 minutes</p>
                        <h5>Rue la plus proche</h5>
                        <p>Rue de la capitainerie,<br />Marseille, 13000, France
                        </p>
                        <h5>Parking publique le plus proche</h5>
                        <p>Possibilité de se garer à un parking Lidl à proximité</p>
                    </div>
                </div>

                <div className={styles.ratingKeyWordLevel}>
                    <span><img className={styles.starRating} src={starFull} alt='' /><p className={styles.rating}>&nbsp;{spot.rating} sur 5 ({spot.totalRating})</p>
                    </span> &nbsp;&nbsp;&nbsp;<div className={styles.keyWordLevelOnly}> 
                    
                    <h4>{spot.keywords.map( x => x + ', ' )}-</h4>
                        &nbsp;&nbsp;<p className={renderLevel(spot.level)}>{spot.level}</p>
                    </div>

                </div>

            </div>

        </div>);
    }
}