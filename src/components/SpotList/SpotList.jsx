import React from 'react';
import styles from './SpotList.module.scss';
import { SpotMiniature } from '../SpotMiniature/SpotMiniature';


var wid = 0.88 * window.innerWidth; // equals 2 times 6vw which is padding of container
const spotToDisplay = [];

function getSpotToDisplay(sectLength, blockLength) {
    if (spotToDisplay.length === 0) {
        var numberDisplay = Math.floor(sectLength / blockLength);
        if (numberDisplay <= 2) {
            numberDisplay = 2;
        }
        for (var i = 1; i <= numberDisplay * 2; i++) {
            spotToDisplay.push(<SpotMiniature />);
        }
    };


}
export class SpotList extends React.Component {


    render() {
        getSpotToDisplay(wid, 300);


        return (
            <div>
                <div className={styles.header}>
      <h2>NOS SPOTS À LA UNE</h2>
                    {/* {this.props.locationDetected ? <h2>SPOTS TENDANCES PRÈS DE CHEZ TOI</h2> : <h2>SPOTS TENDANCES AUTOUR DE MARSEILLE</h2>} */}
                </div>
                <div className={styles.spotList}>
                    {spotToDisplay.map(spot => {
                        return <div key={spotToDisplay.indexOf(spot)}>{spot}</div>;
                    })}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
       
    }
}