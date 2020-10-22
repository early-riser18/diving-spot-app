import React from 'react';
import styles from './SpotPage.module.scss';
import { SpotMainInfo } from '../SpotMainInfo/SpotMainInfo';
import Diaporama from '../Diaporama/Diaporama';
import SpotDescription from '../SpotDescription/SpotDescription';
import CommentList from '../CommentList/CommentList';
import myAPI from '../../util/myAPI';
import { Redirect } from 'react-router-dom';
// Will have states returned from the database

// Compo sattelite view fix
//compo comment section -> within -> comments nested

export class SpotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectErr: null,
            spot: {
                // NEED TO FIGURE OUT HOW TO PRESERVE LINEBREAK FROM JSON TO STRING
                title: 'Calanques de Samena',
                author: 'Vincent B.',
                lastUpdated: '05/07/2020',
                dateCreated: "13/9/2020",
                rating: 4.8,
                totalRating: 117,
                keywords: {
                    adaptedFor: 'scubaDiving',
                    caracteristics: {
                        fishy: false,
                        reef: true,
                        shipwreck: false,
                        wall: true
                    },
                    depth: '0 to 9m',
                    recommendedAccess: 'foot'
                },
                latitude: "4.232292",
                longitude: "34.2032",
                level: 'medium',
                accessPoint: 'Départ à l’eau à 30m au sud de la capitainerie du port de Marseille Accès à pied en 5 minutes',
                street: 'Rue de la capitainerie',
                postalCode: '13000',
                city: 'Marseille',
                country: 'France',
                parking: "Possibilité de se garer à un parking Lidl à proximité",
                description: 'Ce lieu de plongée est splendide. Il est habrité entre le port et la digue ce qui permet d’apprécier les algues et les poissons. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> <br/>Praesent at euismod sem, dictum dapibus ligula. Proin fringilla iaculis lorem, vel bibendum sapien gravida sit amet. Pellentesque vehicula pulvinar odio, in cursus dui semper ac.<br/><br/>Fusce nec laoreet arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                image: [
                    "https://firebasestorage.googleapis.com/v0/b/diving-app-eaabe.appspot.com/o/images%2Fdesktop%20backgorund.jpg?alt=media&token=94e4d329-ca1e-4c10-bd1b-606064a449be",
                    "https://firebasestorage.googleapis.com/v0/b/diving-app-eaabe.appspot.com/o/images%2Fdesktop%20backgorund.jpg?alt=media&token=94e4d329-ca1e-4c10-bd1b-606064a449be",

                ],
                comments: [

                    {
                        author: 'Vincent B.',
                        profilePic: '',
                        memberSince: '02/02/2005',
                        title: 'Un must-have!',
                        rating: 5,
                        pros: ['Beaucoup d’espèces de poisson', 'Peu de monde', 'Bien éclairé'],
                        cons: ['Un peu pollué', 'Des fois un peu trop de courant'],
                        comment: 'Dans l’ensemble, ce spot est vraiment top, j’ai beaucoup aimé les écrevisses et les poulpes qui viennent se faufiler entre mes pieds. Les étoiles sont de toutes les couleurs, j’en ai même ramené deux à la maison pour ma maman.'

                    },
                    {
                        author: 'Patrick K.',
                        profilePic: '',
                        memberSince: '18/12/2012',
                        title: 'Très joli',
                        rating: 4,
                        pros: ['Eau transparente', 'Beaux coraux'],
                        cons: ["Trop d'algues", 'Du courant'],
                        comment: 'Dans l’ensemble, ce spot est vraiment top, j’ai beaucoup aimé les écrevisses et les poulpes qui viennent se faufiler entre mes pieds. Les étoiles sont de toutes les couleurs, j’en ai même ramené deux à la maison pour ma maman.'

                    }
                ]
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

    initializeSpot(spotID) {
        myAPI.fetchSpot(spotID).then(spotData => {
            console.log(spotData);
            if (spotData) {
                this.setState({ spot: spotData });

            } else {
                this.setState({ redirectErr: '/error' });
            }
        });
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


    UNSAFE_componentWillMount() {
        this.initializeSpot('-MKAodqdu3aD4f2M5Rna'); // -MKAodqdu3aD4f2M5Rna
    }

    componentWillUnmount() {
        // this.setState({ redirectErr: null });
    }


    render() {
        if (this.state.redirectErr) {
            return <Redirect to={this.state.redirectErr} />
        }


        return (
            <div className={styles.wrapper}>

                {this.state.isDiapoHidden ?
                    <div>
                        <SpotMainInfo spot={this.state.spot} onClickOpen={this.handleDiapoOpen} />
                        <SpotDescription spot={this.state.spot} />
                        <CommentList spot={this.state.spot} />

                    </div> :
                    <Diaporama spot={this.state.spot} index={this.state.diapoIndex} content={this.showSlide(this.state.diapoIndex)} onClickPlus={this.plusSlide} onClickMinus={this.minusSlide} onClickClose={this.handleDiapoClose} />
                }
            </div>
        )
    }
}