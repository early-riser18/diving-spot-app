import React from 'react';
import styles from './SpotMiniature.module.scss';

import { Link } from 'react-router-dom';
import renderLevel from '../../util/renderLevel';
import renderStar from '../../util/renderStar';
import translateKeywords from '../../util/translateKeywords';

export class SpotMiniature extends React.Component {
 constructor(props){
     super(props);
 }



    render() {
        let spot = this.props.info;
        return (
           <Link className={styles.spotLink} to={`/result?id=${this.props.spotId}`} >
           <div className={styles.spot}>
                <img className={styles.spotImg} src={(spot.image[0])} alt='' />
                <div className={styles.description}>
        <h3>{spot.title}</h3>
        <h4 className={styles.cutText}>{spot.city}, {spot.country}</h4>
                    <div className={styles.keyWordLevel}>
        <h4 className={styles.cutText}>{translateKeywords.depth(spot.keywords.depth)}</h4> &nbsp;&nbsp; <p className={spot.level}>{translateKeywords.level(spot.level)}</p>
                    </div>
                    <div className={styles.rating}>
                        {renderStar(5)}&nbsp;&nbsp;
                        {/* to be completed at a later stage */}
                        {/* <p className={styles.ratingText}>4.8 sur 5</p>&nbsp;&nbsp;
                        <p className={styles.ratingText}>(117)</p> */}
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}