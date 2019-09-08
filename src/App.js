import React from "react";
import update from "immutability-helper";
import MapContainer from "./mapContainer/MapContainer";
import LocationFinder from "./locationFinder/LocationFinder";
import MidlLocation from "./midlLocation/MidlLocation";
import JourneyTime from "./JourneyTimes/JourneyTime";
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
      midlMarker: [{
        name: "",
        position: {
          lat: '',
          lng: ''
        }
      }],
      places: []
    };
    this.addMidlMarkerGeographic = this.addMidlMarkerGeographic.bind(this);
    this.addMidlMarkerJourneyTime = this.addMidlMarkerJourneyTime.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
    this.findXMidl = this.findXMidl.bind(this);
    this.findYMidl = this.findYMidl.bind(this);
    this.midlLocation = this.midlLocation.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.reset = this.reset.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }

  updateMarkers(position, index) {
    if (this.state.markers[index] === undefined) {
      this.addMarker(position, index)
    } else {
      this.updateMarker(position, index)
    }
  }

  addMarker(position, index) {
    this.setState(state => {
      const markers = [...state.markers, this._createMarker(position, `Location ${index + 1}`)];
      return {
        mapCenterLat: position.lat,
        mapCenterLng: position.lng,
        markers
      };
    });
  }

  _createMarker(position, name){
    return { name: name,
      position: {
        lat: position.lat,
        lng: position.lng
      }}
  }

  updateMarker(position, index) {
    this.setState({
      mapCenterLat: position.lat,
      mapCenterLng: position.lng,
      markers: update(this.state.markers, {
        [index]: {position: {$set: {lat: position.lat, lng: position.lng}
          }
        }
      })
    });
  }

  addMidlMarkerJourneyTime(newMarker) {
    this.setState(() => ({
      midlLocation: this.midlLocation(),
      mapCenterLat: this.findXMidl(),
      mapCenterLng: this.findYMidl(),
      midlMarker: [newMarker],
    }), () => this.getPlaces())
  }

  addMidlMarkerGeographic() {
    this.setState(() => ({
      midlLocation: this.midlLocation(),
      mapCenterLat: this.findXMidl(),
      mapCenterLng: this.findYMidl(),
      midlMarker: [this._createMarker({
        lat: this.findXMidl(),
        lng: this.findYMidl()
      }, "Midl")],
    }), () => this.getPlaces())
  }

  getPlaces() {
    if (this.state.midlMarker[0] !== undefined) {
      let url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        `${this.state.midlMarker[0].position.lat}, ${this.state.midlMarker[0].position.lng}` +
        "&radius=500&type=restaurant&key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4"
      fetch(url)
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

  reset() {
    this.setState(
      {
        value: "",
        midlLocation: "",
        mapCenterLat: 51.517432,
        mapCenterLng: -0.073262,
        markers: [],
        midlMarker: [],
        places: []
      }
    )
  }

  getStyle() {
    if (this.state.places[0] !== undefined) {
      return { }
    } else {
      return { opacity: 0 }
    }
  }

  render() {
    return (
      <div>
        <div className="journeyTime" >
          <JourneyTime
            markers={this.state.markers}
            addMidlMarkerJourneyTime={this.addMidlMarkerJourneyTime}
            midlMarker={this.state.midlMarker}
          />
        </div>
        <div className="locationFormContainer">
          <LocationFinder
            markers={this.state.markers}
            addMidlMarker={this.addMidlMarkerGeographic}
            updateMarkers={this.updateMarkers}
            reset={this.reset}
          />
          <div className="midlLocationContainer" >
            <MidlLocation
              markers={this.state.markers}
              midlLocation={this.state.midlLocation}
              places={this.state.places}
            />
          </div>
        </div>
        <div>
          <MapContainer
            mapCenterLat={this.state.mapCenterLat}
            mapCenterLng={this.state.mapCenterLng}
            markers={this.state.markers}
            midlMarker={this.state.midlMarker}
          />
        </div>
      </div>
    );
  }
}

export default App;
