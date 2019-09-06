import React from "react";
import update from "immutability-helper";
import axios from "axios";
import MapContainer from "./MapContainer";
import LocationFinder from "./LocationFinder";
import MidlLocation from "./MidlLocation";
import MidlPlaces from "./MidlPlaces";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      midlLocation: "",
      mapCenterLat: 51.517432,
      mapCenterLng: -0.073262,
      markers: [],
      midlMarker: [],
      places: []
    };
    this.addMidlMarker = this.addMidlMarker.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
    this.findXMidl = this.findXMidl.bind(this);
    this.findYMidl = this.findYMidl.bind(this);
    this.midlLocation = this.midlLocation.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
  }

  updateMarkers(position, index) {
    if (this.state.markers[index] === undefined) {
      this.setState(state => {
        let newMarker = {
          name: `Location ${index + 1}`,
          position: {
            lat: position.lat,
            lng: position.lng
          }
        };
        const markers = [...state.markers, newMarker];
        return {
          value: "",
          midlLocation: "",
          mapCenterLat: position.lat,
          mapCenterLng: position.lng,
          markers,
          midlMarker: [],
          places: []
        };
      });
    } else {
      this.setState({
        mapCenterLat: update(this.state.mapCenterLat, {
          $set: position.lat
        }),
        mapCenterLng: update(this.state.mapCenterLng, {
          $set: position.lng
        }),
        markers: update(this.state.markers, {
          [index]: {
            position: {
              $set: {
                lat: position.lat,
                lng: position.lng
              }
            }
          }
        })
      });
    }
  }

  addMidlMarker() {
    let newMarker = {
      name: "Midl",
      position: {
        lat: this.findXMidl(),
        lng: this.findYMidl()
      }
    };
    this.setState((state) => ({
      value: "",
      midlLocation: this.midlLocation(),
      mapCenterLat: this.findXMidl(),
      mapCenterLng: this.findYMidl(),
      markers: this.state.markers,
      midlMarker: [newMarker],
      places: []
    }), (state) => this.getPlaces())
  }

  getPlaces() {
    if (this.state.midlMarker[0] !== undefined) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.midlMarker[0].position.lat}, ${this.state.midlMarker[0].position.lng}&radius=500&type=restaurant&key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4`)
      .then(res => res.json())
      .then(res => this.setState({places: res.results}))
    }
  }

  midlLocation() {
    return `lat: ${this.findXMidl()}, lng: ${this.findYMidl()}`;
  }

  findXMidl() {
    let xSum = this.state.markers.reduce(function(total, marker) {
      return marker.position.lat + total;
    }, 0);
    let x3 = xSum / this.state.markers.length;
    return x3;
  }

  findYMidl() {
    let ySum = this.state.markers.reduce(function(total, marker) {
      return marker.position.lng + total;
    }, 0);
    let y3 = ySum / this.state.markers.length;
    return y3;
  }

  render() {
    return (
      <div
        style={{
          margin: "0px"
        }}
      >
        <div className="locationFormContainer">
          <LocationFinder
            markers={this.state.markers}
            addMidlMarker={this.addMidlMarker}
            updateMarkers={this.updateMarkers}
          />{" "}
          <div className="midlLocationContainer">
            <MidlLocation
              markers={this.state.markers}
              midlLocation={this.state.midlLocation}
              places={this.state.places}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div>
          <MapContainer
            mapCenterLat={this.state.mapCenterLat}
            mapCenterLng={this.state.mapCenterLng}
            markers={this.state.markers}
            midlMarker={this.state.midlMarker}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
