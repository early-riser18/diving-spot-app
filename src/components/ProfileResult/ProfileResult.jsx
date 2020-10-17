import React from 'react';
import styles from './ProfileResult.module.scss';
import starFull from '../../assets/starFull.svg';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import renderLevel from '../../util/renderLevel';


export class ProfileResult extends React.Component {
   
    render() {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultImgList}>

                    <Carousel showThumbs={false} showStatus={false}  >
                        <div>
                            <img className={styles.carouselImg} src={require('../../assets/spotImg1png.jpg') } alt='' />
                           {/*  <p className="legend"></p> Legend can be added here */}
                        </div>
                        <div>
                            <img  className={styles.carouselImg} src={require('../../assets/spotImg1png.jpg')} alt='' />
                           {/*  <p className="legend"></p> Legend can be added here */}
                           </div>
                        <div>
                            <img className={styles.carouselImg} src={require('../../assets/spotImg1png.jpg')} alt=''/>
                           {/*  <p className="legend"></p> Legend can be added here */}
                           </div>
                    </Carousel>


                </div>
                <div className={styles.description}>
                    <div className={styles.headings}><h3>Calanques de Samena</h3>
                        <h4>Provences-Alpes-Côtes-D’Azur, France</h4>
                        <h4>Accès à pied en 10 minutes</h4>
                    </div>
                    <div className={styles.keyWordLevelRating}>
                        <div className={styles.keyWordLevelOnly}> <h4>0 et 20m, Récif, Poissoneux -</h4>
                        &nbsp;&nbsp; <p className={renderLevel('Facile')}>Facile</p>
                        </div>
                        &nbsp;&nbsp; <span><img className={styles.starRating} src={starFull} alt='' /><p>&nbsp;4.8 (117)</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}