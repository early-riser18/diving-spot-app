import React from 'react';
import styles from './SearchMenu.module.scss'
import MapIcon from '../../assets/map-icon.svg';
import Close from '../../assets/close-icon.svg';
import Map from '../util/Map';
import SearchResultList from '../SearchResultList/SearchResultList';

export class SearchMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fullMap: false };
        this.toggleMap = this.toggleMap.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.setFixMap);
    }
    setFixMap() {
        const sideMap = document.getElementById('sideMap');
        const endList = document.getElementById('list-container')

        if (sideMap) {
            if (endList.getBoundingClientRect().bottom < window.innerHeight) {
                sideMap.style.position = 'absolute'

            } else if (endList.getBoundingClientRect().bottom >= window.innerHeight) {
                sideMap.style.position = 'fixed'
            }
        }
    }

    toggleMap() {
        { this.state.fullMap ? this.setState({ fullMap: false }) : this.setState({ fullMap: true }) }
        
    }
    
    render() {
        return (
            <div id="list-container" className={styles.searchContainer}>
                <div>
                    {SearchResultList()};
                         <button className={styles.showMap} onClick={this.toggleMap}>
                        <img className={styles.mapIcon} src={MapIcon} />Map</button>
                </div>
                <div id='sideMap' className={styles.sideMapContainer}>
                    {Map()}
                </div>
                <div className={this.state.fullMap ? styles.fullMapContainer : styles.notDisplayed}>
                    <button className={styles.mapClose}><img className={styles.closeIcon} src={Close}
                        onClick={this.toggleMap} />
                    </button>
                    {Map()}
                </div>
            </div>
        );
    }
}