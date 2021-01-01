import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './SpotPreviewMini.module.scss';
import translateKeywords from '../../util/translateKeywords';
import starFull from '../../assets/starFull.svg';
import Close from '../../assets/close-icon.svg';
import { Link } from 'react-router-dom';
export const SpotPreviewMini = (props) => {

    // const selectSide = () => {
    //     let x = window.innerWidth / 2;
    //     let y = window.innerHeight / 2;
    //     let screenCenter = [x , y];

    //     let marker = document.getElementById(`M${props.markerRefId}`);
    //     let mx = marker.parentNode.parentNode.style.top;
    //     let my = marker.parentNode.parentNode.style.left;
    //     let markerCenter = [mx, my];
    //     console.log(marker.parentElement.parentElement,'Center', screenCenter, 'marker', markerCenter)



    // }
    // useEffect(() => {
    //     selectSide();
    //     return () => {

    //     }
    // } )
    let { title, city, image, level, keywords, rating } = props.spotData;


    return (<div id='markerSelection' className={`${styles.wrapper} ${styles.popTop}`}>
        <button className={styles.closeBtn}><span><img className={styles.closeIcon} src={Close} alt=''
            onClick={props.handleClosePreviewMini} /></span></button>
      
        <div className={styles.carousel}>

           
            <Carousel showThumbs={false} showStatus={false} >
                {image ? (image.map((val, index) => {
                    return (<img className={styles.carouselImg} key={index} src={val} alt='' />)
                }))
                    : (<img className={styles.carouselImg} src={require('../../assets/placeholder-pic.jpg')} alt='' />
                    )}
            </Carousel>
        </div>
        <Link to={{
                pathname: '/result',
                search: `?id=${props.markerRefId}`,
                // state: { queryData: queryData }
            }}>
        <div className={styles.infoBox}>
            <h3>{title}</h3>
            <div>
                <span> <h4>{translateKeywords.depth(keywords.depth)}, {translateKeywords.caract(keywords.caracteristics)} </h4>
                </span>
                <span><h4 className={level}>{translateKeywords.level(level)}</h4>&nbsp;–&nbsp;
            <img className={styles.starRating} src={starFull} alt='' /><h4>&nbsp;{rating ? ` ${rating} / 5` : 'n/a'}</h4> </span>
            </div>
        </div>
        </Link>
    </div >)
}