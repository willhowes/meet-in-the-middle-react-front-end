import React from "react";
import "../styles.css";

class JourneyTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: false,
    }

    this.getUrl = this.getUrl.bind(this);
  }

  componentDidMount(prevProps, prevState){
    if (this.props.midlMarker[0].name === 'Midl') {
      this.getDirections()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevProps.midlMarker !== this.props.midlMarker) {
      this.getDirections()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.midlMarker !== this.props.midlMarker
    || this.state.route !== nextState.route) {
      return true
    } else {
      return false
    }
  }

  getUrl(){
    let origin = "origin=" + this.props.marker.position.lat + ',' + this.props.marker.position.lng
    let destination = "&destination=" + this.props.midlMarker[0].position.lat + ',' + this.props.midlMarker[0].position.lng
    let key = "&key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4"
    let mode = "&mode=transit"
    return "https://maps.googleapis.com/maps/api/directions/json?" + origin + destination + key + mode
  }

  getDirections(){
    if (this.props.midlMarker[0].name === "Midl") {
      fetch(this.getUrl(), {
        method: 'GET'
      }).then(json => json.json())
      .then(response => this.setState({route: response}))
    }
  }

  render() {
    console.log('render Journey Time')
    if (this.state.route !== false) {
      return <p style={{padding: 10}} >Journey time {this.props.num} -> Midl = {this.state.route.routes[0].legs[0].duration.text}</p>
    } else {
      return null
    }
  }
}

export default JourneyTimes;
