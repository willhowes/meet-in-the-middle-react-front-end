import React from 'react';
import axios from 'axios';

class MidlPlaces extends React.Component {
  constructor() {
    super();
    this.state = { places: [] };
  }

  render() {
    return <div>Hello</div>;
  }

  componentDidMount() {
    console.log("LOOK HERE")
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.midlPlaces}&radius=500&type=restaurant&key=AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY`)
    .then(res => this.setState({ places: res.data}))
  }
}

export default MidlPlaces;
