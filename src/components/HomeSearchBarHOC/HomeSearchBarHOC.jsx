import React, { useState, useEffect } from 'react';
import { HomeSearchBar } from '../HomeSearchBar/HomeSearchBar';
import Script from 'react-load-script';
import formToJSON from '../../util/formToJSON';
import myAPI from '../../util/myAPI';
import { Redirect } from 'react-router-dom';
export const HomeSearchBarHOC = () => {

    const [query, setQuery] = useState({ lat: 43.335698, lng: 5.270670, level: 'all', locationName: 'Marseille, France', startSearch: false });
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
        autocomplete.setFields(['address_components', 'geometry']);
        // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed',
            handlePlaceSelect);
    }

    const handlePlaceSelect = () => {

        // Extract Address From Address Object
        const addressObject = autocomplete.getPlace();
        const address = addressObject.geometry.location;

        // *** To obtain address from getplace and not value in form ***
        // let addressCity = `${addressObject.address_components[0].long_name}`;
        // let addressCountry;
        // for (let i = 0; i < addressObject.address_components.length; i++) {
        //     if (addressObject.address_components[i].types[0] === 'country') {
        //         addressCountry = addressObject.address_components[i].long_name;
        //         break;
        //     }
        // };

        if (address) {
            setQuery({
                ...query, lat: address.lat(), lng: address.lng(),
                //  locationName: { city: addressCity, country: addressCountry }
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let myForm = document.getElementById('searchBarBig');
        let data = formToJSON(myForm);

        if (data['areaQuery'] === ''){
            data['areaQuery'] = query.locationName;
        }
        console.log(data);
        setQuery({ ...query, locationName: data['areaQuery'], level: data['keyWordQuery'], startSearch: true });
    }

    const handleRedirect = () => {
        let urlRedirect = `/search?lat=${query.lat}&lng=${query.lng}&locName=${query.locationName}&lvl=${query.level}`;
        setRedirect(urlRedirect);
    }


    useEffect(() => {
        if (query.startSearch === true) {
            handleRedirect();
        }
    });


    return (<div>
        { redirect ? <Redirect push to={redirect} /> : ''}

        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAddqyJJRGL9vCNBS8IARse91gKkEhMgYM&libraries=places&language=fr"
            onLoad={handleScriptLoad}
        />
        <HomeSearchBar onClick={handleSubmit} />
    </div>)
}