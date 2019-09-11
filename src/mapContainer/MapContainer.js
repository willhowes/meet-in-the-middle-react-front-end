import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "../styles.css";

const google = (window.google = window.google ? window.google : {});

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.placeMarker = this.placeMarker.bind(this);
    this.getBounds = this.getBounds.bind(this);
    this.getCenter = this.getCenter.bind(this);
  }

  placeMarker(marker, i = 0) {
    return (
      <Marker
        key={i}
        title={marker.name}
        name={marker.name}
        position={{
          lat: marker.position.lat,
          lng: marker.position.lng
        }}
      ></Marker>
    );
  }

  getBounds() {
    if (this.props.markers.length > 1) {
      var points = this.props.markers.map(function(marker, i) {
        return { lat: marker.position.lat, lng: marker.position.lng };
      });
      var bounds = new this.props.google.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      return bounds;
    }
  }

  getCenter() {
    if (this.props.markers.length === 1) {
      return {
        lat: this.props.mapCenterLat,
        lng: this.props.mapCenterLng
      };
    } else if (this.props.markers.length === 0) {
      return {
        lat: this.props.mapCenterLat,
        lng: this.props.mapCenterLng
      };
    }
  }

  render() {
    return (
        <Map
          google={google}
          style={{height: "87%"}}
          zoom={18}
          initialCenter={{
            lat: this.props.mapCenterLat,
            lng: this.props.mapCenterLng
          }}
          center={this.getCenter()}
          bounds={this.props.markers.length > 0 ? this.getBounds() : undefined}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          }}
        >
          {this.props.markers.map(this.placeMarker)}
          {this.props.midlMarker.map(this.placeMarker)}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDkqVxDDu_TzV8SORSyM1rXVNP7qQfAGHg"
})(MapContainer);
