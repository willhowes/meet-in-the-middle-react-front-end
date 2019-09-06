import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "./styles.css";

const google = (window.google = window.google ? window.google : {});

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    function placeMarker(marker, i){
      return (
        <Marker
          key={i}
          title={marker.name}
          name={marker.name}
          position={{
            lat: marker.position.lat,
            lng: marker.position.lng
          }}
        >
        </Marker>
      );
    }
    return (
      <div id="map">
        <Map
          google={google}
          zoom={18}
          initialCenter={{
            lat: this.props.mapCenterLat,
            lng: this.props.mapCenterLng
          }}
          center={{
            lat: this.props.mapCenterLat,
            lng: this.props.mapCenterLng
          }}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          }}
        >
          {this.props.markers.map(placeMarker)}
          {this.props.midlMarker.map(placeMarker)}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY"
})(MapContainer);
