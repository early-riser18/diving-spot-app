import React, { useState, useEffect } from 'react';
import { HomeSearchBar } from '../HomeSearchBar/HomeSearchBar';
import Script from 'react-load-script';
import formToJSON from '../../util/formToJSON';
import myAPI from '../../util/myAPI';
import { Redirect } from 'react-router-dom';

export const HomeSearchBarHOC = () => {

    const [query, setQuery] = useState({ lat: 43.335698, lng: 5.270670, level: 'all', locName: 'Marseille, France', startSearch: false });
    const [redirect, setRedirect] = useState(null);

    let autocomplete;
    const handleScriptLoad = () => {
        // Declare Options For Autocomplete 
        const options = {
            types: ['(cities)']
        };

        // Initialize Google Autocomplete 
        /*global google*/
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoneQueryAutocomplete'), options);
        // Pay only for data you need
        autocomplete.setFields(['address_components']);
        // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed',
            handlePlaceSelect);

    }

    const handlePlaceSelect = () => {
        const addressObject = autocomplete.getPlace();
        console.log(addressObject);
        let locCity, locCountry;
        if (addressObject.address_components) {
            addressObject.address_components.forEach((val) => {
                if (val.types[0] === "locality") {
                    locCity = val.long_name;
                } else if (val.types[0] === "country") {
                    locCountry = val.long_name;
                }
            })
            console.log(`${locCity}, ${locCountry}`);
            setQuery({ ...query, locName: `${locCity}, ${locCountry}` })
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let myForm = document.getElementById('searchBarBig');
        let data = formToJSON(myForm);

        if (!data['areaQuery']) {
            setQuery({ ...query, startSearch: true })
            // Then will query with initial/last state
        } else {
            // Check if data has been formatted (most likely to be correct then)
            if (data['areaQuery'].includes(',')) {
                getPlaceLocation(data['areaQuery']).then((res) => {
                    console.log('in handle submit: ', res);
                    setQuery({ ...query, locName: data['areaQuery'], lat: res.lat, lng: res.lng, startSearch: true })
                });

            } else {
                console.log(data['areaQuery'])
                getPlaceAutoComp(data['areaQuery']).then(res => {
                    console.log(res)
                    let predictedPlaceName = res.name;
                    getPlaceLocation(res.name).then((res) => {
                        setQuery({ ...query, locName: predictedPlaceName, lat: res.lat, lng: res.lng, startSearch: true })

                    });
                });
            }



        }
    }

    const handleRedirect = () => {
        let urlRedirect = `/search?lat=${query.lat}&lng=${query.lng}&locName=${query.locName}&lvl=${query.level}`;
        setRedirect(urlRedirect);
    }

    useEffect(() => {
        if (query.startSearch) {
            handleRedirect();
        }
    })


    const getPlaceAutoComp = (place) => {
        console.log('Supplied Place: ', place);
        var autoCompService = new google.maps.places.AutocompleteService();

        // Bounds from France
        let sw = new google.maps.LatLng(41.34, 9.84);
        let ne = new google.maps.LatLng(50.64, -5.15);
        let frBounds = new google.maps.LatLngBounds(sw, ne);

        return new Promise((resolve) => {
            autoCompService.getPlacePredictions({
                input: place, bounds: frBounds, types: ['(cities)']
            }, (res) => {
                let predictionName = res[0].description;
                let predictionId = res[0].place_id;
                console.log(predictionId, predictionName);
                resolve({ name: predictionName, place_id: predictionId })
            })
        })
    }

    const getPlaceLocation = (address, placeId) => {
        var getDetailService = new google.maps.Geocoder;

        if (address) {
            return new Promise(resolve => getDetailService.geocode({ address: address }, (res) => {
                let resLoc = res[0].geometry.location;
                resolve({ lat: resLoc.lat(), lng: resLoc.lng() })
            }))
        } else {
            return new Promise(resolve => getDetailService.geocode({ placeId: placeId }, (res) => {
                let resLoc = res[0].geometry.location;
                resolve({ lat: resLoc.lat(), lng: resLoc.lng() })
            }))
        }
    }


    return (<div>
        { redirect ? <Redirect push to={redirect} /> : ''}

        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAddqyJJRGL9vCNBS8IARse91gKkEhMgYM&libraries=places&language=fr"
            onLoad={handleScriptLoad}
        />
        <HomeSearchBar onClick={handleSubmit} />



    </div>)
} 