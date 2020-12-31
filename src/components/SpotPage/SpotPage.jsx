import React from 'react';
import styles from './SpotPage.module.scss';
import { SpotMainInfo } from '../SpotMainInfo/SpotMainInfo';
import Diaporama from '../Diaporama/Diaporama';
import SpotDescription from '../SpotDescription/SpotDescription';
import CommentList from '../CommentList/CommentList';
import myAPI from '../../util/myAPI';
import { Redirect } from 'react-router-dom';
import { ReactComponent as Loader } from '../../assets/Double Ring-1s-200px.svg';
// Will have states returned from the database

// Compo sattelite view fix
//compo comment section -> within -> comments nested

export class SpotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectErr: null,
            spot: {
                keywords: {},
                image: [],
                comments: []
            },
            diapoIndex: 1,
            isDiapoHidden: true
        };
        this.plusSlide = this.plusSlide.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.minusSlide = this.minusSlide.bind(this);
        this.showSlide = this.showSlide.bind(this);
        this.handleDiapoClose = this.handleDiapoClose.bind(this);
        this.handleDiapoOpen = this.handleDiapoOpen.bind(this);
        this.initializeSpot = this.initializeSpot.bind(this);
    }

    initializeSpot(spotQuery, bool) {
        // myAPI.fetchSpot(spotQuery).then(spotData => {
        //     console.log(spotData);
        //     if (spotData) {
        //         this.setState({ spot: spotData });
        //         this.removeLoader();
        //     } else {
        //         this.setState({ redirectErr: '/error' });

        //     }
        // });
        // NEw
        if (bool){
            this.setState({ spot: spotQuery['queryData'] });
            this.removeLoader();
        } else {
            let spotQueryURLParams = new URLSearchParams(spotQuery);
            let spotQueryURLId = spotQueryURLParams.get('id');
            myAPI.fetchSpot(spotQueryURLId).then(spotData => {
                console.log(spotData);
                if (spotData) {
                    this.setState({ spot: spotData });
                    this.removeLoader();
                } else {
                    this.setState({ redirectErr: '/error' });
    
                }
            });
        }
    }

    removeLoader() {
        setTimeout(() => {
            
            let loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add(`${styles.loaderOff}`)
                document.body.style.overflow = 'visible';
    
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1500)
            }
           
        }, 800);

    }

    plusSlide() {
        this.updateIndex(this.state.diapoIndex + 1);
    }
    minusSlide() {
        this.updateIndex(this.state.diapoIndex - 1);
    }
    updateIndex(n) {

        let slides = this.state.spot.image;
        if (n > slides.length) {
            this.setState({ diapoIndex: 1 })
        }
        else if (n < 1) {
            this.setState({ diapoIndex: slides.length })
        }
        else { this.setState({ diapoIndex: n }); }
    }

    showSlide(n) {
        let slides = this.state.spot.image;
        return slides[n - 1];
    }
    handleDiapoOpen() {
        if (this.state.isDiapoHidden === true) {
            this.setState({ isDiapoHidden: false });
        }
    }
    handleDiapoClose() {
        if (this.state.isDiapoHidden === false) {
            this.setState({ isDiapoHidden: true });
        }
    }


    componentDidMount() {
        if (this.props.location.state){
            this.initializeSpot(this.props.location.state, true)
        } else {
            this.initializeSpot(this.props.location.search, false);

        }
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        this.setState({ redirectErr: null });
        document.body.style.overflow = 'visible';

    }


    render() {
        if (this.state.redirectErr) {
            return <Redirect  to={this.state.redirectErr} />
        }


        return (
            <div className={styles.wrapper}>

                {this.state.isDiapoHidden ?
                    <div>
                        <SpotMainInfo spot={this.state.spot} onClickOpen={this.handleDiapoOpen} />
                        <SpotDescription spot={this.state.spot} />
                        {/* <CommentList spot={this.state.spot} /> */}

                    </div> :
                    <Diaporama spot={this.state.spot} index={this.state.diapoIndex} content={this.showSlide(this.state.diapoIndex)} onClickPlus={this.plusSlide} onClickMinus={this.minusSlide} onClickClose={this.handleDiapoClose} />
                }
                <div className={styles.loader} id='loader'>
                    <div className={styles.animation}>
                        <Loader />
                    </div>
                </div>
            </div>
        )
    }
}