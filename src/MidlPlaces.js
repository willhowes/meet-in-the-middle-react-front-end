import React from "react";
import axios from "axios";
import MidlLocation from "./MidlLocation";

class MidlPlaces extends React.Component {
  constructor() {
    super();
    this.state = {
      places: [],
      midlLat: this.props.midlLat
    };
  }

  componentDidMount() {
    console.log("MidlPlacesCall");
    console.log(this.props.midlPlacesLng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.midlPlacesLat}, ${this.props.midlPlacesLng}&radius=500&type=restaurant&key=AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY`
      )

      .then(res => console.log(res.data));
    // .then(res => this.setState({ places: res.data }))

    // .then(res => console.log(this.state.places));
  }

  render() {
    return <div>Hello</div>;
  }
}

export default MidlPlaces;
