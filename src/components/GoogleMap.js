import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "500px",
  height: "500px"
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null
    };
  }

  render() {
    console.log("RETURN RESULTS HERE:", this.state.place);
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 38.7223, lng: -9.1393 }}
      >
        <Marker
          position={{ lat: 38.7204705, lng: -9.145160599999999 }}
          draggable={true}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MY_GOOGLE_API_KEY
})(GoogleMap);