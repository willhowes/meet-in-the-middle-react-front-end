import React from "react";
import "../styles.css";

class JourneyTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
      route: '',
      request: false
    };
    this.requestRoute = this.requestRoute.bind(this);
    this.requestBody = this.requestBody.bind(this);
    this.renderJourneyTime = this.renderJourneyTime.bind(this);
    this.middleOfRoute = this.middleOfRoute.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.markers !== nextProps.markers || nextState.route.length !== this.state.route.length) {
      return true
    } else {
      return false
    }
  }

  requestBody(){
    let now = new Date()
    let formatted_date = now.toISOString()
    return ({
      "locations": [
        {
          "id": "Marker 1",
          "coords": {
            "lat": this.props.markers[0].position.lat,
            "lng": this.props.markers[0].position.lng
          }
        },
        {
          "id": "Marker 2",
          "coords": {
            "lat": this.props.markers[1].position.lat,
            "lng": this.props.markers[1].position.lng
          }
        }
      ],
      "departure_searches": [
        {
          "id": "route_search",
          "departure_location_id": "Marker 1",
          "arrival_location_ids": [
            "Marker 2"
          ],
          "transportation": {
            "type": "public_transport"
          },
          "departure_time": `${formatted_date}`,
          "properties": ["travel_time", "distance", "route"]
        }
      ]
    })
  }

  middleOfRoute() {
    let halfWay = this.state.route.travel_time / 2
    let halfWaySet = this.state.route.travel_time / 2
    let journey = this.state.route.route.parts
    let middleRoute = []
    let timeSoFar = 0
    let travelTimeBeginningOfHalfWay = 0
    let travelTimeEndOfHalfWay = 0
    let journeySplitRatio = 0
    journey.forEach(function(segment, i){
      if (halfWay <= 0 && middleRoute.length === 0) {
        middleRoute = journey[i-1]
        travelTimeEndOfHalfWay = timeSoFar
        travelTimeBeginningOfHalfWay = travelTimeEndOfHalfWay - journey[i-1].travel_time
        journeySplitRatio = (halfWaySet - travelTimeBeginningOfHalfWay) / (travelTimeEndOfHalfWay - travelTimeBeginningOfHalfWay)
      } else {
        halfWay = halfWay - segment.travel_time
        timeSoFar += segment.travel_time
      }
    })
    let xMore = (middleRoute.coords[0].lat - middleRoute.coords[middleRoute.coords.length-1].lat) * journeySplitRatio
    let yMore = (middleRoute.coords[0].lng - middleRoute.coords[middleRoute.coords.length-1].lng) * journeySplitRatio
    let midlMarker = {
      name: "Midl",
      position: {
        lat: middleRoute.coords[0].lat - xMore,
        lng: middleRoute.coords[0].lng - yMore
      }
    };
    this.props.addMidlMarkerJourneyTime(midlMarker)
  }

  requestRoute() {
    if (this.props.markers.length > 1) {
      fetch('http://api.traveltimeapp.com/v4/routes', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Application-Id': 'b573c4f9',
            'X-Api-Key': '5e65e4fca602a52427f48d2f235bf088',
          },
        body: JSON.stringify(this.requestBody()), // body data type must match "Content-Type" header
      }).then(json => json.json())
      .then(response => this.setState({ route: response.results[0].locations[0].properties[0], request: true }))
    }
  }

  renderJourneyTime() {
    if (this.state.request) {
      this.middleOfRoute()
      function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
      }
      return (
        <h2>Journey time: {secondsToHms(this.state.route.travel_time)}</h2>
      );
    } else {
      return null
    }
  }

  render() {
    this.requestRoute()
    return (
      this.renderJourneyTime()
    );
  }
}

export default JourneyTime;
