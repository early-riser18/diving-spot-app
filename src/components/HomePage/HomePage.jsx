import React from 'react';
import { HomeSearchBar } from '../HomeSearchBar/HomeSearchBar'
import styles from './HomePage.module.scss';
import { SpotList } from '../SpotList/SpotList';
export class HomePage extends React.Component {


    render() {
        return (
            <div >
                
                <div className={styles.headings}> <h1 className={styles.title}>DÉCOUVRE TON NOUVEAU SPOT DE PLONGÉE PRÉFÉRÉ</h1>
                    <p className={styles.subtitle}>How-To-Sea est l’unique site collaboratif d’échange de spot de plongée en France et dans les septs mers du Globe.</p>
                </div>
                <HomeSearchBar />
                <SpotList locationDetected={this.props.locationDetected} />
                
            </div>
        )

    }
}