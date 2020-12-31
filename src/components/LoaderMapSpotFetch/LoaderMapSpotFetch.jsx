import styles from './LoaderMapSpotFetch.module.scss';
import React from 'react';
import { ReactComponent as Loader } from '../../assets/LoaderFetch.svg';


export const LoaderMapSpotFetch = (props) => {

    return (
        <div className={styles.wrapper}>
            {props.isFetching ?
                <div>
                    <div className={styles.loader}> <Loader /></div>
                </div>
                :
                <div className={styles.result}>
                     <p>Résultats dans cette zone</p>
                </div>
            }
        </div>
    )
}