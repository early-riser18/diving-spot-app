import React, { Component, useState, UseEffect } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ src, idRef }) => <div><a href={`#${idRef}`}><img style={{width: "20px"}} src={src} alt=''/></a></div>;

class GMap extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {isLoaded: false}
  }
  
  static defaultProps = {
    
    zoom: 11,
  };

componentDidMount(){
  this.setState({isLoaded: true});
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



  loadMarkers() {
    let markersArray = [];

    if (typeof this.props.queryResult === 'object' && this.props.queryResult) {
      this.props.queryResult.map((val, index) => {
        let resultData = Object.values(val)[0];
        // console.log()
        let marker = <AnyReactComponent key={Object.keys(val)[0]} idRef={Object.keys(val)[0]} lat={resultData.latitude} lng={resultData.longitude}             src={require(`../assets/pin-icon-${resultData.level}.png`)}
        />;
        markersArray.push(marker);
      });
    }
    return markersArray
  }

  createMapOptions(maps) {
    return {
      scrollwheel: true,
    }
  }
  
  handleChange(event){
    this.props.onChange(event);
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAddqyJJRGL9vCNBS8IARse91gKkEhMgYM" }}
          defaultCenter={this.validateCenter()}
          defaultZoom={this.props.zoom}
          options={this.createMapOptions}
          onChange={this.handleChange}
          onTilesLoaded={this.alertLoaded}
        >
          
          {this.loadMarkers()}
      
        </GoogleMapReact>
      </div>
    );
  }
}

export default GMap;
