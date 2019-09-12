import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import MapContainer from "./mapContainer/MapContainer";
import LocationContainer from "./locationFinder/LocationContainer";
import MidlLocation from "./midlLocation/MidlLocation";
import JourneyTime from "./JourneyTimes/JourneyTime";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      midlLocation: false,
      mapCenterLat: 51.517432,
      mapCenterLng: -0.073262,
      markers: [],
      midlMarker: [
        {
          name: "",
          position: {
            lat: "",
            lng: ""
          }
        }
      ],
      midlArea: "testing",
      places: [],
      findMidl: false,
      midLJourneyType: "public_transport",
      meetTime: ""
    };
    this.addMidlMarkerGeographic = this.addMidlMarkerGeographic.bind(this);
    this.addMidlMarkerJourneyTime = this.addMidlMarkerJourneyTime.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
    this.findXMidl = this.findXMidl.bind(this);
    this.findYMidl = this.findYMidl.bind(this);
    this.midlLocation = this.midlLocation.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.changeMidlJourneyType = this.changeMidlJourneyType.bind(this);
    this.setMidlRequest = this.setMidlRequest.bind(this);
    this.meetTime = this.meetTime.bind(this);
    this.isHidden = this.isHidden.bind(this);
  }

  changeMidlJourneyType(type) {
    this.setState({ midLJourneyType: type });
  }

  updateMarkers(position, index) {
    if (this.state.markers[index] === undefined) {
      this.addMarker(position, index);
    } else {
      this.updateMarker(position, index);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markers !== nextState.markers ||
      this.state.findMidl !== nextState.findMidl ||
      this.state.midlMarker !== nextState.midlMarker ||
      this.state.places !== nextState.places ||
      this.props.currentUser !== nextProps.currentUser ||
      this.state.meetTime !== nextState.meetTime
    ) {
      return true;
    } else {
      return false;
    }
  }

  addMarker(position, index) {
    this.setState(state => {
      const markers = [
        ...state.markers,
        this._createMarker(position, `Location ${index + 1}`)
      ];
      return {
        mapCenterLat: position.lat,
        mapCenterLng: position.lng,
        markers
      };
    });
  }

  meetTime(datetime) {
    this.setState({ meetTime: datetime });
  }

  updateMidlArea = midlArea => {
    this.setState({ midlArea: midlArea });
  };

  setMidlRequest(bol) {
    this.setState({ findMidl: bol });
  }

  _createMarker(position, name) {
    return {
      name: name,
      position: {
        lat: position.lat,
        lng: position.lng
      }
    };
  }

  updateMarker(position, index) {
    this.setState({
      mapCenterLat: position.lat,
      mapCenterLng: position.lng,
      markers: update(this.state.markers, {
        [index]: {
          position: { $set: { lat: position.lat, lng: position.lng } }
        }
      })
    });
  }

  addMidlMarkerJourneyTime(newMarker) {
    this.setState(
      () => ({
        midlLocation: this.midlLocation(),
        mapCenterLat: this.findXMidl(),
        mapCenterLng: this.findYMidl(),
        midlMarker: [newMarker]
      }),
      () => this.getPlaces()
    );
  }

  addMidlMarkerGeographic() {
    this.setState(
      () => ({
        midlLocation: this.midlLocation(),
        mapCenterLat: this.findXMidl(),
        mapCenterLng: this.findYMidl(),
        midlMarker: [
          this._createMarker(
            {
              lat: this.findXMidl(),
              lng: this.findYMidl()
            },
            "Midl"
          )
        ]
      }),
      () => this.getPlaces()
    );
  }

  getPlaces() {
    if (this.state.midlMarker[0] !== undefined) {
      let url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        `${this.state.midlMarker[0].position.lat}, ${this.state.midlMarker[0].position.lng}` +
        "&radius=500&type=restaurant&key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4";
      fetch(url)
        .then(res => res.json())
        .then(res =>
          this.setState({ places: this.categorisePlaces(res.results) })
        );
    }
  }

  categorisePlaces(places) {
    let bars = [];
    let restaurants = [];
    let lodgings = [];
    let miscellaneous = [];
    let cafes = [];
    let museums = [];

    places.forEach(function(element) {
      if (element.types.includes("bar")) {
        bars.push(element);
      }
      if (element.types.includes("restaurant")) {
        restaurants.push(element);
      }
      if (element.types.includes("lodging")) {
        lodgings.push(element);
      }
      if (element.types.includes("cafe")) {
        cafes.push(element);
      }
      if (element.types.includes("museum")) {
        museums.push(element);
      }
      if (element.name !== "London") {
        miscellaneous.push(element);
      }
    });

    let arrays = [bars, restaurants, lodgings, cafes, museums];
    arrays.forEach(function(array) {
      miscellaneous = miscellaneous.filter(n => !array.includes(n));
    });
    return {
      bars: bars,
      restaurants: restaurants,
      lodgings: lodgings,
      cafes: cafes,
      museums: museums,
      miscellaneous: miscellaneous
    };
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

  getStyle() {
    if (this.state.places[0] !== undefined) {
      return {};
    } else {
      return { opacity: 0 };
    }
  }

  showSignUpForm() {
    this.setState(state => {
      let newUser = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      };
      return {
        newUser
      };
    });
  }

  showLogInForm() {
    this.setState(state => {
      let user = {
        name: "",
        email: "",
        password: ""
      };
      return {
        user
      };
    });
  }

  isHidden(){
    if (this.state.midlMarker[0].name === 'Midl') {
      return ({
        visibility: "visible"
      })
    } else {
      return {
        visibility: "hidden"
      };
    }
  }

  render() {
    return (
      <div>
        <div className="locationFormContainer">
          <LocationContainer
            markers={this.state.markers}
            addMidlMarker={this.setMidlRequest}
            updateMarkers={this.updateMarkers}
            reset={this.reset}
            changeMidlJourneyType={this.changeMidlJourneyType}
            currentUser={this.props.currentUser}
            meetTime={this.meetTime}
          />
      </div>
        <div
          style={this.isHidden()}
          className="journeyTime"
          >
          <JourneyTime
            markers={this.state.markers}
            addMidlMarkerJourneyTime={this.addMidlMarkerJourneyTime}
            midlMarker={this.state.midlMarker}
            findMidl={this.state.findMidl}
            setMidlRequest={this.setMidlRequest}
            journeyType={this.state.midLJourneyType}
            updateMidlArea={this.updateMidlArea}
            meetTime={this.meetTime}
          />
        <div>
            <MidlLocation
              markers={this.state.markers}
              midlLocation={this.state.midlLocation}
              places={this.state.places}
              setMidlRequest={this.setMidlRequest}
              midlArea={this.state.midlArea}
            />
          </div>
        </div>
      <div className="mapContainer">
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

Main.propTypes = {
  currentUser: PropTypes.object
};

export default Main;
