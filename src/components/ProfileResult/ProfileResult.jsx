import React from 'react';
import styles from './ProfileResult.module.scss';
import starFull from '../../assets/starFull.svg';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import renderLevel from '../../util/renderLevel';
import translateKeywords from '../../util/translateKeywords';
import { Link } from 'react-router-dom';


export class ProfileResult extends React.Component {
    constructor(props) {
        super(props);
        let queryData = {};

    }
    componentDidMount() {

    }
    render() {
        let queryData;
        let queryRef = Object.keys(this.props.queryData)[0];
        Object.keys(this.props.queryData).forEach((val, index) => {
            queryData = this.props.queryData[val];
        })

        return (
            <div id={queryRef} className={styles.resultContainer}>

                <div className={styles.clickableContainer}>
                    <div className={styles.resultImgList}>
                        <Carousel showThumbs={false} showStatus={false} >
                            {queryData.image ? (queryData.image.map((val) => {
                                return (<img className={styles.carouselImg} src={val} alt='' />)
                            }))
                                : (<img className={styles.carouselImg} src={require('../../assets/placeholder-pic.jpg')} alt='' />
                                )}
                        </Carousel>
                    </div>


                    <div className={styles.description}>
                        <Link to={{
                            pathname: '/result',
                            search: `?id=${queryRef}`,
                            state: { queryData: queryData, lastQuery: window.location.search }
                        }}>
                            <div className={styles.headings}>
                                <h3>{queryData.title}</h3>
                                <h4>{queryData.city}, {queryData.postalCode}</h4>
                                {/* <h4>Accès à pied en 10 minutes</h4> */}
                                <h4>Accès recommendé {queryData.keywords.recommendedAccess === 'boat' ? 'par bateau' : 'à pied'}</h4>
                            </div>

                            <div className={styles.keyWordLevelRating}>
                                <div className={styles.keyWordLevelOnly}>
                                    <h4>{translateKeywords.depth(queryData.keywords.depth)}, {translateKeywords.caract(queryData.keywords.caracteristics)} -&nbsp;</h4>
                                    <p className={queryData.level}> {translateKeywords.level(queryData.level)}</p>
                                </div>

                                <span><img className={styles.starRating} src={starFull} alt='' /><p>&nbsp;
                            {/* {queryData.rating ? `${queryData.totalRating}` : ''} */}
                            </p>
                                </span>

                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}