import React from 'react';
import styles from './SearchResultList.module.scss';
import { ProfileResult } from '../ProfileResult/ProfileResult';


export default function SearchResultList() {
    return (
        <div className={styles.listContainer}> 
            <h2>Spots de plongée à Marseille</h2>
            <h4> X spots trouvés – X Catégorie</h4>
            <ProfileResult />
            <ProfileResult />
            <ProfileResult />
        </div>

    );
}