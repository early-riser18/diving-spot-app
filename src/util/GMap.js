import React, { Component, useState, UseEffect } from "react";
import GoogleMapReact from "google-map-react";
import { LoaderMapSpotFetch } from "../components/LoaderMapSpotFetch/LoaderMapSpotFetch";
import { SpotPreviewMini } from "../components/SpotPreviewMini/SpotPreviewMini";
import {MapMarker} from '../components/MapMarker/MapMarker';


class GMap extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { isLoaded: false};
  }

  static defaultProps = {
    isFetching: false,
    zoom: 11,
  };

  componentWillMount() {
    let center = this.validateCenter();
    this.setState({ center: center});

  }
  componentDidMount() {
    this.setState({ isLoaded: true});
  }
  validateCenter() {
    let validatedCenter;

    if (this.props.center) {
      validatedCenter = {
        lat: parseFloat(this.props.center.lat),
        lng: parseFloat(this.props.center.lng),
      };
    }
    return validatedCenter;
  }

  loadMarkers(markerSelected) {
    let markersArray = [];
    if (typeof this.props.queryResult === "object" && this.props.queryResult) {
      this.props.queryResult.map((val, index) => {
        let resultData = Object.values(val)[0];
        // console.log()
        let marker = (
          <MapMarker
            onClick={this.props.onMarkerClick}
            key={Object.keys(val)[0]}
            idRef={Object.keys(val)[0]}
            lat={resultData.latitude}
            lng={resultData.longitude}
            src={require(`../assets/pin-icon-${resultData.level}.png`)}
          />
        );
        markersArray.push(marker);

        if (markerSelected){
          let s1 = markerSelected.substring(1);
        
          if (s1 === Object.keys(val)[0]) {
            console.log(s1, Object.values(val)[0]);
            let x = (
              <SpotPreviewMini handleClosePreviewMini={this.props.handleClosePreviewMini} markerRefId={Object.keys(val)[0]} lat={resultData.latitude} lng={resultData.longitude} spotData={Object.values(val)[0]} />
            );
            markersArray.push(x);
          }
        }
      });
    }
    return markersArray;
  }

  loadSpotPrevMini(markerSelected) {
    // if (markerSelected){
    //   <SpotPreviewMini lat={} lng={} markerPos={} spotID={spotID} />
    // }
  }

  createMapOptions(maps) {
    return {
      scrollwheel: true,
      gestureHandling: "greedy",
      fullscreenControl: false,
      maxZoom: 15,
      minZoom: 5,
    };
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <LoaderMapSpotFetch isFetching={this.props.isFetching} />
        <GoogleMapReact
          onMarkerClick={this.props.onMarkerClick}
          bootstrapURLKeys={{ key: "AIzaSyAddqyJJRGL9vCNBS8IARse91gKkEhMgYM" }}
          defaultCenter={this.state.center}
          defaultZoom={this.props.zoom}
          options={this.createMapOptions}
          onChange={this.handleChange}
          onTilesLoaded={this.alertLoaded}
          resetBoundsOnResize={true}
        >
          {this.loadMarkers(this.props.markerSelected)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GMap;
