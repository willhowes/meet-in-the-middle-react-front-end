import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

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
    if (marker.name === "Midl") {
      return (
        <Marker
          key={i}
          title={marker.name}
          name={marker.name}
          position={{
            lat: marker.position.lat,
            lng: marker.position.lng
          }}
          icon={{
            url: "https://i.ibb.co/SxTWgzc/riannelogo3.png",
            scaledSize: new google.maps.Size(32,32)}
          }
        ></Marker>
      )
    } else if (i === 0) {
      return (<Marker
        key={i}
        title={marker.name}
        name={marker.name}
        position={{
          lat: marker.position.lat,
          lng: marker.position.lng
        }}
        icon={{
          url: "https://i.ibb.co/72QrcpH/location.png",
          scaledSize: new google.maps.Size(32,32)}
        }
      ></Marker>)
  } else {
      return (
      <Marker
        key={i}
        title={marker.name}
        name={marker.name}
        position={{
          lat: marker.position.lat,
          lng: marker.position.lng
        }}
        icon={{
          url: "https://i.ibb.co/9N03WvJ/location-1.png",
          scaledSize: new google.maps.Size(32,32)}
        }
      ></Marker>
    )}
  }

  getBounds() {
    if (this.props.markers.length > 1) {
      var points = this.props.markers.map(function(marker, i) {
        if (marker.position.lat > this.props.markers[i+1]) {
          return { lat: (marker.position.lat), lng: marker.position.lng * 0.4};
        } else {
          return { lat: (marker.position.lat), lng: marker.position.lng * 1.3};
        }
      }, this);
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
          zoom={12}
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
  apiKey: "AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A"
})(MapContainer);
