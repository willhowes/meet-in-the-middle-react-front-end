import React from "react";
import "../styles.css";
import TransportTypeSelector from './TransportTypeSelector'


class JourneyTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: false,
      journeyType: this.props.journeyType()
    }

    this.getUrl = this.getUrl.bind(this);
    this.changeJourneyType = this.changeJourneyType.bind(this)
    this.getDirections = this.getDirections.bind(this)
    this.getJourneyType = this.getJourneyType.bind(this)
    this.getGoogleMapsCompatibleJourneyType = this.getGoogleMapsCompatibleJourneyType.bind(this)
  }

  componentDidMount(prevProps, prevState){
    if (this.props.midlMarker[0].name === 'Midl') {
      this.getDirections()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevProps.midlMarker !== this.props.midlMarker
    || this.state.journeyType !== prevState.journeyType) {
      this.getDirections()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.midlMarker !== this.props.midlMarker
    || this.state.route !== nextState.route
    || this.state.journeyType !== nextState.journeyType) {
      return true
    } else {
      return false
    }
  }

  changeJourneyType(type){
    this.setState({journeyType: type})
  }

  getUrl(){
    let origin = "origin=" + this.props.marker.position.lat + ',' + this.props.marker.position.lng
    let destination = "&destination=" + this.props.midlMarker[0].position.lat + ',' + this.props.midlMarker[0].position.lng
    let key = "&key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4"
    let mode = `&mode=${this.state.journeyType}`
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

  getJourneyType(){
    if (this.state.journeyType === "public_transport" || this.state.journeyType === "transit") {
      return "Public transport"
    } else if (this.state.journeyType === "walking") {
      return "Walking"
    } else if (this.state.journeyType === "bicycling" || this.state.journeyType === "cycling") {
      return "Cycling"
    } else {
      return "Driving"
    }
  }

  getGoogleMapsCompatibleJourneyType() {
    if (this.state.journeyType === "public_transport" || this.state.journeyType === "transit") {
      return "transit"
    } else if (this.state.journeyType === "walking") {
      return "walking"
    } else if (this.state.journeyType === "bicycling" || this.state.journeyType === "cycling") {
      return "bicycling"
    } else {
      return "driving"
    }
  }

  render() {
    if (this.state.route !== false) {
      return (
        <div>
          <a href={`https://www.google.com/maps/dir/?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=${this.getGoogleMapsCompatibleJourneyType()}`}><p id={`journeyTimeDisplay${this.props.num}`}style={{padding: 10}}>{this.getJourneyType()} time {this.props.num} -> Midl = {this.state.route.routes[0].legs[0].duration.text}</p></a>
          <TransportTypeSelector num={this.props.num} 
          journeyType={this.props.journeyType} changeJourneyType={this.changeJourneyType}/>
        </div>
      )
    } else {
      return null
    }
  }
}

export default JourneyTimes;
