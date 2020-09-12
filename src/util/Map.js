import React from 'react';
// Use Google Map Component through NPM
export default function Map() {
    return (
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAq1r-SuohavkfoycfPBUSufQHZ4P5EjMs&q=Space+Needle,Seattle+WA" allowfullscreen>
        </iframe>)
}