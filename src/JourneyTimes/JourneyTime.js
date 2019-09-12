import React from "react";
import JourneyTimes from './JourneyTimes'

class JourneyTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '',
      midlPointLatCoord: '',
      midlPointLngCoord: '',
      midlArea: '',
    };
    this.requestRouteMidl = this.requestRouteMidl.bind(this);
    this.requestBody = this.requestBody.bind(this);
    this.renderJourneyTime = this.renderJourneyTime.bind(this);
    this.middleOfRoute = this.middleOfRoute.bind(this);
    this.journeyType = this.journeyType.bind(this);

  }

  journeyType(){
    if (this.props.journeyType === "public_transport") {
      return "transit"
    } else if (this.props.journeyType === "cycling") {
      return "bicycling"
    } else {
      return this.props.journeyType
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.findMidl) {
      this.requestRouteMidl()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.findMidl !== nextProps.findMidl
    || nextProps.midlMarker[0].name !== this.props.midlMarker[0].name
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
            "type": `${this.props.journeyType}`
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
      let halfWay = this._getHalfWayTime()
      let journey = this.state.route.route.parts
      let middleRoute = []
      let timeSoFar = 0
      let travelTimeBeginningOfHalfWay = 0
      let travelTimeEndOfHalfWay = 0
      let journeySplitRatio = 0
      journey.forEach(function(segment, i){
        // checks to see if middle point reached and already returned
        if (halfWay <= 0 && middleRoute.length === 0) {
          // Picks the previous segment as the middle route
          middleRoute = journey[i-1]
          // Sets the travel time for the end of previous segment
          travelTimeEndOfHalfWay = timeSoFar
          // Set the travel time for the beginning of previous segment
          travelTimeBeginningOfHalfWay = travelTimeEndOfHalfWay - journey[i-1].travel_time
          // Calculates the ratio of middle distance within the segment
          journeySplitRatio = (this._getHalfWayTime() - travelTimeBeginningOfHalfWay) / (travelTimeEndOfHalfWay - travelTimeBeginningOfHalfWay)
        } else {
          // removes segment time from half the total travel time until it reaches 0
          halfWay -= segment.travel_time
          // calculates the travel time so far
          timeSoFar += segment.travel_time
        }
      }, this)
      // creates a Midl Marker at the nearest stop in the middle segment
      this.props.addMidlMarkerJourneyTime(this._setMidlMarker(journeySplitRatio, middleRoute))
      // sets journey times from each direction towards the Midl Marker (not very accurate!)
    } else {
      return null
    }
  }

  _getHalfWayTime(){
    return this.state.route.travel_time / 2
  }

  _setMidlMarker(journeySplitRatio, middleRoute){
    // roughly works out at which stop in the middle segment to set the middle marker
    let index = Math.round( (middleRoute.coords.length - 1) * journeySplitRatio )
    // rules out edge cases
    if (journeySplitRatio < 0.5) {
      index = index === 0 ? 1 : index - 1
    } else {
      index = (index === middleRoute.coords.length - 1) ? index - 1 : index
    }
    // returns new middle marker at correct coordinate

    this.setState({ midlPointLatCoord: middleRoute.coords[index].lat });
    this.setState({ midlPointLngCoord: middleRoute.coords[index].lng });

    this._getMidlLocation();


    return this._createMarker(
        "Midl",
        middleRoute.coords[index].lat,
        middleRoute.coords[index].lng
    )

  }

  _getMidlLocation() {
    let midlCoordinates = "latlng=" + this.state.midlPointLatCoord + ","
                            + this.state.midlPointLngCoord

    let url = "https://maps.googleapis.com/maps/api/geocode/json?" +
              midlCoordinates +
              "&key=AIzaSyDkqVxDDu_TzV8SORSyM1rXVNP7qQfAGHg";

    fetch(url)
      .then(json => json.json())

      .then(response => {
        if (response.results[0].address_components[2].long_name === "London") {
          this.setState( state => ({midlArea: response.results[0].address_components[1].long_name }));
        } else if (response.results[0].address_components[1].long_name === "London") {
            this.setState({midlArea: response.results[0].address_components[0].long_name });
        } else {
          this.setState({midlArea: response.results[0].address_components[2].long_name });
        }
      })

      .then(response => this.props.updateMidlArea(this.state.midlArea))

      .catch(error => {
        console.log(error.response)
      });

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

  requestRouteMidl() {
    fetch('https://api.traveltimeapp.com/v4/routes', {
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
    if (this.props.midlMarker[0].name === 'Midl') {
      return (
        <div>
          <JourneyTimes
            setMidlRequest={this.props.setMidlRequest}
            marker={this.props.markers[0]}
            midlMarker={this.props.midlMarker}
            journeyType={this.journeyType}
            num={"A"}
            />
          <JourneyTimes
            setMidlRequest={this.props.setMidlRequest}
            marker={this.props.markers[1]}
            midlMarker={this.props.midlMarker}
            journeyType={this.journeyType}
            num={"B"}
            />

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
