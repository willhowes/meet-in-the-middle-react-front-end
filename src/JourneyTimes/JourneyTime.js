import React from "react";
import JourneyTimes from './JourneyTimes'
import "../styles.css";

class JourneyTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
      route: '',
      journeyTimeA: '',
      journeyTimeB: '',
      midlMarker: this.props.midlMarker
    };
    this.requestRouteMidl = this.requestRouteMidl.bind(this);
    this.requestBody = this.requestBody.bind(this);
    this.renderJourneyTime = this.renderJourneyTime.bind(this);
    this.middleOfRoute = this.middleOfRoute.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.findMidl) {
      this.requestRouteMidl()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.midlMarker[0].position.lat !== nextState.midlMarker[0].position.lat
      || this.props.markers !== nextProps.markers
      || nextState.route.length !== this.state.route.length
      || this.state.journeyTimeA !== nextState.journeyTimeA
      || this.props.findMidl !== nextProps.findMidl
    ) {
      return true
    } else {
      return false
    }
  }

  requestBody(coords){
    let now = new Date()
    let formatted_date = now.toISOString()
    return ({
      "locations": [
        {
          "id": "Marker 1",
          "coords": {
            "lat": coords.lat1,
            "lng": coords.lng1
          }
        },
        {
          "id": "Marker 2",
          "coords": {
            "lat": coords.lat2,
            "lng": coords.lng2
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
    // checks to see if middle marker has been requested
    if (this.props.findMidl) {
      // creates many many holding variables
      let halfWay = this.state.route.travel_time / 2
      let halfWaySet = this.state.route.travel_time / 2
      let journey = this.state.route.route.parts
      let middleRoute = []
      let timeSoFar = 0
      let travelTimeBeginningOfHalfWay = 0
      let travelTimeEndOfHalfWay = 0
      let journeySplitRatio = 0
      // Iterates through journey array to find middle point by travel time
      journey.forEach(function(segment, i){
        // checks to see if middle point reached and returned
        if (halfWay <= 0 && middleRoute.length === 0) {
          // Picks the previous segment as the middle route
          middleRoute = journey[i-1]
          // Sets the travel time for the end of previous segment
          travelTimeEndOfHalfWay = timeSoFar
          // Set the travel time for the beginning of previous segment
          travelTimeBeginningOfHalfWay = travelTimeEndOfHalfWay - journey[i-1].travel_time
          // Calculates the ratio of middle distance within the segment
          journeySplitRatio = (halfWaySet - travelTimeBeginningOfHalfWay) / (travelTimeEndOfHalfWay - travelTimeBeginningOfHalfWay)
        } else {
          // removes segment time from half the total travel time until it reaches 0
          halfWay -= segment.travel_time
          // calculates the travel time so far
          timeSoFar += segment.travel_time
        }
      })
      // creates a Midl Marker at the nearest stop in the middle segment
      this.props.addMidlMarkerJourneyTime(this._setMidlMarker(journeySplitRatio, middleRoute))
      // sets journey times from each direction towards the Midl Marker (not very accurate!)
      this.setState(this._journeySet())
    } else {
      return null
    }
  }

  _setMidlMarker(journeySplitRatio, middleRoute){
    // roughly works out at which stop in the middle segment to set the middle marker
    let index = Math.round( (middleRoute.coords.length - 1) * journeySplitRatio )
    // rules out edge cases
    if (journeySplitRatio < 0.5) {
      index = index === 0 ? 1 : index - 1
    } else {
      index = (middleRoute.coords.length - 1) ? index - 1 : index
    }
    // returns new middle marker at correct coordinate
    return this._createMarker(
        "Midl",
        middleRoute.coords[index].lat,
        middleRoute.coords[index].lng
    )
  }

  _createMarker(name, lat, lng){
    return {
      name: name,
      position: {
        lat: lat,
        lng: lng
      }
    };
  }

  _journeySet(){
    return {
      journeyTimeA: this.state.route.travel_time / 2,
      journeyTimeB: this.state.route.travel_time / 2
    }
  }

  requestRouteMidl() {
    fetch('http://api.traveltimeapp.com/v4/routes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Application-Id': 'b573c4f9',
          'X-Api-Key': '5e65e4fca602a52427f48d2f235bf088',
        },
      body: JSON.stringify(this.requestBody({
          lat1: this.props.markers[0].position.lat,
          lng1: this.props.markers[0].position.lng,
          lat2: this.props.markers[1].position.lat,
          lng2: this.props.markers[1].position.lng
      })),
    }).then(json => json.json())
    .then(response => this.setState({ route: response.results[0].locations[0].properties[0] }))
    .then(test => this.middleOfRoute())
  }

  renderJourneyTime() {
    if (this.props.findMidl) {
      return (
        <div>
          <JourneyTimes num={"A"} journeyTime={this.state.journeyTimeA}/>
          <JourneyTimes num={"B"} journeyTime={this.state.journeyTimeB}/>
        </div>
      );
    } else {
      return null
    }
  }

  render() {
    return (
      this.renderJourneyTime()
    );
  }
}

export default JourneyTime;
