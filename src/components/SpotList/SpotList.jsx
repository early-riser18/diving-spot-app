import React from 'react';
import styles from './SpotList.module.scss';
import { SpotMiniature } from '../SpotMiniature/SpotMiniature';
import myAPI from '../../util/myAPI';


export class SpotList extends React.Component {

    constructor(props){
        super(props);
        this.state = { spotData: {}}
    }

    getSpotToDisplay() {
        let spotToDisplay = [];

        if (Object.keys(this.state.spotData).length > 0 &&  typeof this.state.spotData === 'object') {
            for (var i = 0; i < Object.keys(this.state.spotData).length; i++) {
                spotToDisplay.push(<div key={i}>
                    <SpotMiniature spotId={Object.keys(this.state.spotData)[i]} info={Object.values(this.state.spotData)[i]} />
                </div>);
            }
            return spotToDisplay
        };
    
    
    }

    componentDidMount(){
        myAPI.fetchSpotRec().then((res)=> {
            console.log(res)
            this.setState({spotData : res});
        }).catch(err => console.log(err))
    }

    
    render() {

        return (
            <div>
                <div className={styles.header}>
      <h2>NOS SPOTS À LA UNE</h2>
                    {/* {this.props.locationDetected ? <h2>SPOTS TENDANCES PRÈS DE CHEZ TOI</h2> : <h2>SPOTS TENDANCES AUTOUR DE MARSEILLE</h2>} */}
                </div>
                <div className={styles.spotList}>
                    {this.getSpotToDisplay()}
                </div>
            </div>
        );
    }

}