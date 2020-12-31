import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SearchMenu.module.scss'
import MapIcon from '../../assets/map-icon.svg';
import Close from '../../assets/close-icon.svg';
import GMap from '../../util/GMap';
import SearchResultList from '../SearchResultList/SearchResultList';
import myAPI from '../../util/myAPI';
import { SpotPreviewMini } from '../SpotPreviewMini/SpotPreviewMini';

export class SearchMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fullMap: false, queryResult: null, lastUpdatedMap: null, currMapDetails: null, isFetching: true, markerSelected: null};
        this.toggleMap = this.toggleMap.bind(this);
        this.handleMapChange = this.handleMapChange.bind(this);
       this.handleMarkerClick = this.handleMarkerClick.bind(this);
       this.handleClosePreviewMini = this.handleClosePreviewMini.bind(this);

    }


    componentDidMount() {
        window.addEventListener('scroll', this.setFixMap);
        this.setMapWidth();
        window.addEventListener('resize', this.setMapWidth);
        this.SearchInit();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.setFixMap);
        window.removeEventListener('resize', this.setMapWidth);
    }

    SearchInit() {
        let search = window.location.search.substring(1);

        // Ensure query params are present before fetching data
        if (!search) {
            // Apply a default string
            window.location.search = 'lat=43.335698&lng=5.27067&locName=Marseille,France&lvl=all';
        } else {
            var searchParams = new URLSearchParams(search);
            const preUpdate = new URLSearchParams(search);
            // ADD REMAINING PARAMETERS LATER
            searchParams.forEach((value, key) => {
                if (value === '') {
                    switch (key) {
                        case 'lat':
                            return searchParams.set(key, 43.335698);
                        case 'lng':
                            return searchParams.set(key, 5.27067);
                        case 'locName':
                            return searchParams.set(key, 'Marseille, France');
                        case 'lvl':
                            return searchParams.set(key, 'all');
                    }
                }
            });
            // After URL check done, if any change then assign new params
            if (preUpdate.toString() !== searchParams.toString()) {
                window.location.search = searchParams.toString();
            }

            search = searchParams.toString();
        }

        let locName = searchParams.get('locName');
        let queryLat = searchParams.get('lat');
        let queryLng = searchParams.get('lng')

        // Load map with right center before api fetch returns values
        this.setState({ locPos: { lat: queryLat, lng: queryLng }, locName: locName })

    }

    // Try to get map bounds on init, so you can query only spots within bounds, 
    //then make the api fetch, then set listener for all future changes, after a change you make a new fetch
    handleMapChange(event) {
        let mapDetails = event;
        console.log(mapDetails)

        // Checks if map just initialized
        if (this.state.currMapDetails === null) {
            this.setState({ currMapDetails: mapDetails }, () => {
                this.execSearch();
            });
            // Otherwise checks if query was made in the last 3 seconds
        } else {
            if (this.state.lastUpdatedMap === null) {
                let x = new Date();
                this.setState({ lastUpdatedMap: x });
            }

            var now = new Date();
            var timeout = now.setSeconds(now.getSeconds() - 1);

            if (this.state.lastUpdatedMap < timeout) {
                // If not then
                console.log('timout')
                this.setState({ currMapDetails: mapDetails, locPos: mapDetails.center, locName: null }, () => {
                    this.execSearch();
                });

                // Reset timer to current time
                let y = new Date();
                this.setState({ lastUpdatedMap: y })
            }
        }
    }

    execSearch() {
        this.setState({ isFetching: true });
        let search = window.location.search.substring(1);
        let mapBounds;
        if (!this.state.currMapDetails.size.width || !this.state.currMapDetails.size.height) {
            mapBounds = undefined;

        } else {
            mapBounds = this.state.currMapDetails.bounds;
        }

        myAPI.fetchSpotList(search, mapBounds, 10).then((res) => {
            this.setState({ queryResult: res, isFetching: false })
        });
    }

    // Dynamically change map width - to offset fixed positioning side effetcs
    setMapWidth() {
        const sideMap = document.getElementById('sideMap');
        const placeholderSideMap = document.getElementById('placeholderSideMap');
        sideMap.style.width = `${placeholderSideMap.getBoundingClientRect().width}px `;
    }


    // Enable map animation /!\ Can be resource intensive
    setFixMap() {
        const sideMap = document.getElementById('sideMap');
        const endList = document.getElementById('list-container')

        // sideMap.style.width = placeholderSideMap.getBoundingClientRect().width;
        // sideMap.style.width = placeholderSideMap.style.width;
        if (sideMap) {
            if (endList.getBoundingClientRect().bottom < window.innerHeight) {
                sideMap.style.position = 'absolute'

            } else if (endList.getBoundingClientRect().bottom >= window.innerHeight) {
                sideMap.style.position = 'fixed'
            }
        }
    }

    toggleMap() {
        this.state.fullMap ? this.setState({ fullMap: false }) : this.setState({ fullMap: true })
    }

    handleMarkerClick(event) {
        event.persist();
        console.log(event)
        if (!this.state.fullMap) {
            //Scroll to right spot
            
            let el = event.target.id.substring(1);
           let matchingel =  document.getElementById(el);
            matchingel.scrollIntoView({ behavior: 'smooth', block: 'end' });
            matchingel.classList.add(styles.markerClickAnimation);
            setTimeout(() => matchingel.classList.remove(styles.markerClickAnimation), 2000);
        } else {
            // Spawn a Spot Preview
        // ReactDOM.render(<SpotPreviewMini />, el); 
        this.setState({ markerSelected: event.target.id});
        }

    }

    handleClosePreviewMini(event){
        // event.preventDefault();
        this.setState({markerSelected: null});

    }
    loadMap() {
        if (this.state.locPos) {
            return (<GMap handleClosePreviewMini={this.handleClosePreviewMini} markerSelected={this.state.markerSelected} onMarkerClick={this.handleMarkerClick} onChange={this.handleMapChange} isFetching={this.state.isFetching} queryResult={this.state.queryResult} center={this.state.locPos} />)
        }
    }




    render() {

        return (
            <div id="list-container" className={styles.searchContainer}>
                <div className={styles.resultList}>
                    <SearchResultList isFetching={this.state.isFetching} queryResult={this.state.queryResult} locName={this.state.locName} />
                    <button className={styles.showMap} onClick={this.toggleMap}>
                        <img className={styles.mapIcon} src={MapIcon} alt='' />Carte</button>
                </div>
                <div className={styles.placeholderWrapper} id="placeholderSideMap">
                    <div id='sideMap' className={styles.sideMapContainer}>
                        {this.loadMap()}
                    </div>
                </div>


                <div className={this.state.fullMap ? styles.fullMapContainer : styles.notDisplayed}>
                    <button className={styles.mapClose}><img className={styles.closeIcon} src={Close} alt=''
                        onClick={this.toggleMap} />
                    </button>
                    {this.loadMap()}
                    <div>
                        {/* Here make space to show the content of a one-item array that display the miniature */}
                    </div>
                </div>
            </div>
        );
    }
}