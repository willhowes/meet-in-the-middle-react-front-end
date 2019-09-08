import React from "react";
import "../styles.css";

class JourneyTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: false,
    }

    this.secondsToHms = this.secondsToHms.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  componentDidMount(prevProps, prevState){
    if (this.props.midlMarker[0].name === 'Midl') {
      this.getDirections()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.midlMarker[0].name !== this.props.midlMarker[0].name
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

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  render() {
    if (this.state.route !== false) {
      return <p style={{padding: 10}} >Journey time {this.props.num} -> Midl = {this.state.route.routes[0].legs[0].duration.text}</p>
    } else {
      return null
    }
  }
}

export default JourneyTimes;
