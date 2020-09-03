import React from 'react';
import styles from './SpotMainInfo.module.scss';
import { Button } from '../Button/Button';
import starFull from '../../assets/starFull.svg';
import { DiapoTab } from '../DiapoTab/DiapoTab';
import renderLevel from '../../util/renderLevel';
import { Link } from 'react-router-dom';



export class SpotMainInfo extends React.Component {
constructor(props){
    super(props);
    this.translateLevel = this.translateLevel.bind(this);
}

translateLevel(level){
    switch (level) {
        case 'easy':
            return 'Facile';
        case 'medium':
            return 'Intermédiaire';
        case 'hard':
            return 'Avancé';
        default: return 'Avancé';
  } 
}

    render() {
        let spot = this.props.spot;
     
        
        return (
        <div>
            <Link to='/search'>
            <Button variant='fourth' text='Retour aux résultats' />

            </Link>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2>{spot.title}</h2>
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
                        <p>{spot.accessPoint}<br/><br/>Accès à pied en X minutes</p>
                        <h5>Rue la plus proche</h5>
                        <p>{spot.street},<br />{spot.city}, {spot.postalCode}, {spot.country}</p>
                        <h5>Parking publique le plus proche</h5>
                        <p>{spot.parking}</p>
                    </div>
                </div>

                <div className={styles.ratingKeyWordLevel}>
                    <span><img className={styles.starRating} src={starFull} alt='' /><p className={styles.rating}>&nbsp;{spot.rating} sur 5 ({spot.totalRating})</p>
                    </span> &nbsp;&nbsp;&nbsp;<div className={styles.keyWordLevelOnly}> 
                    
                   
                        &nbsp;&nbsp;<p className={renderLevel(spot.level)}>{this.translateLevel(spot.level)}</p>
                    </div>

                </div>

            </div>

        </div>);
    }
}