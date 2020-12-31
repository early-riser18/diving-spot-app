import React, { useState, useEffect } from 'react';
import styles from './SearchResultList.module.scss';
import { ProfileResult } from '../ProfileResult/ProfileResult';
import { ProfileResultPlaceholder } from '../ProfileResultPlaceholder/ProfileResultPlaceholder';

export default function SearchResultList(props) {
    let queryData = undefined;
    const [queryResult, setQueryResult] = useState('pending');
    let loadingState;
    let resultList;


    useEffect(() => {
        if (props.queryResult === 'err/connection_refused') {
            alert('Erreur. Nous n\'avons pas pu établir de connexion avec le serveur');


        } else if (props.queryResult && typeof props.queryResult === 'object' && props.queryResult.length === 0) {
            setQueryResult('empty')
        } else if (props.queryResult && typeof props.queryResult === 'object' && props.queryResult.length > 0) {
            setQueryResult('successful')
        }
    })

    const handleResult = (res) => {
        switch (res) {
            case 'pending':
                return (<div>
                    <ProfileResultPlaceholder />
                    <ProfileResultPlaceholder />
                    <ProfileResultPlaceholder />
                </div>);
            case 'empty':
                return (<div>
                    <h3>Aucun résulat trouvé.</h3>
                    <br />
                    <p>Pour obtenir plus de résultat, essayer d'ajuster la zone de recherche.</p>
                </div>);
            case 'successful':
                return (<div>
                    {props.queryResult ? <h4>{props.queryResult.length} spots trouvés – X Catégorie</h4> : <h4 className={styles.placeholder} >s</h4>}

                    {props.queryResult.map((el, index) => {
                        return <ProfileResult key={index} queryData={el} />
                    })}
                    {/* {console.log(props.queryResult)} */}
                </div>);
            default: return (<div><h3>Une erreur s'est produite, veuillez réessayer ultérieurement</h3></div>)


        }


    }

    return (
        <div className={styles.listContainer}>

            {props.queryResult ? <h2>Spots de plongée {props.locName ? `à ${props.locName}` : `dans la zone recherchée`}</h2> : <h2 className={styles.placeholder} >s</h2>}

            {/* // to be changed */}

            {handleResult(queryResult)}
        </div>

    );
}

