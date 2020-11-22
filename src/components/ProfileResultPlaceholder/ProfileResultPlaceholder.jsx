import React from 'react';
import styles from './ProfileResultPlaceholder.module.scss';
import starFull from '../../assets/starFull.svg';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import renderLevel from '../../util/renderLevel';


export class ProfileResultPlaceholder extends React.Component {
    constructor(props) {
        super(props);
        let queryData = {};

    }
   
    render() {
        
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultImgList}>

                <img className={styles.carouselImg} src={require('../../assets/placeholder-pic.jpg')} alt='' />



                </div>
                <div className={styles.description}>
                    <div className={styles.headings}><h3>Placeholder</h3>
                        <h4>Placeholder, Placeholder</h4>
                        {/* <h4>Accès à pied en 10 minutes</h4> */}
                        <h4>Placeholder</h4>
                    </div>
                    <div className={styles.keyWordLevelRating}>
                        <div className={styles.keyWordLevelOnly}> <h4>Placeholder</h4>
                        &nbsp;&nbsp; <p >Placeholder</p>
                        </div>
                        &nbsp;&nbsp; <span><img className={styles.starRating} src={starFull} alt='' /><p>&nbsp;
                        Placeholder</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}