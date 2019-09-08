import React from "react";
import JourneyTimes from './JourneyTimes'
import "../styles.css";

class JourneyTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
      route: '',
      request: false,
      journeyTimeA: '',
      journeyTimeB: '',
      midlMarker: {
        name: "",
        position: {
          lat: '',
          lng: ''
        }
      }
    };
    this.requestRouteMidl = this.requestRouteMidl.bind(this);
    this.requestBody = this.requestBody.bind(this);
    this.renderJourneyTime = this.renderJourneyTime.bind(this);
    this.middleOfRoute = this.middleOfRoute.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.state.midlMarker)
    console.log(nextState.midlMarker)
    console.log(this.props.markers)
    console.log(nextProps.markers)
    console.log(nextState.route.length)
    console.log(this.state.route.length)
    console.log(this.state.journeyTimeA)
    console.log(nextState.journeyTimeA)
    if (this.state.midlMarker.position.lat !== nextState.midlMarker.position.lat || this.props.markers !== nextProps.markers || nextState.route.length !== this.state.route.length || this.state.journeyTimeA !== nextState.journeyTimeA ) {
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

  middleOfRoute(callback) {
    if (this.state.request) {
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
      let midlMarker = {}
      let index = Math.round( (middleRoute.coords.length - 1) * journeySplitRatio )
      if (journeySplitRatio < 0.5) {
        midlMarker = {
          name: "Midl",
          position: {
            lat: middleRoute.coords[index === 0 ? 1 : index - 1].lat,
            lng: middleRoute.coords[index === 0 ? 1 : index - 1].lng
          }
        };
        this.setState({
          journeyTimeA: travelTimeBeginningOfHalfWay + (journeySplitRatio * middleRoute.travel_time),
          journeyTimeB: (this.state.route.travel_time - travelTimeEndOfHalfWay) + ((1 - journeySplitRatio) * middleRoute.travel_time)
        })
      } else {
        midlMarker = {
          name: "Midl",
          position: {
            lat: middleRoute.coords[index === (middleRoute.coords.length - 1) ? index - 1 : index ].lat,
            lng: middleRoute.coords[index].lng
          }
        };
        this.setState({
          journeyTimeA: travelTimeBeginningOfHalfWay + (journeySplitRatio * middleRoute.travel_time),
          journeyTimeB: (this.state.route.travel_time - travelTimeEndOfHalfWay) + ((1 - journeySplitRatio) * middleRoute.travel_time)
        })
      }
      this.props.addMidlMarkerJourneyTime(midlMarker)
      this.setState({midlMarker: midlMarker})
      return callback
    } else {
      return null
    }
  }

  requestRouteMidl(coords) {
    if (this.props.markers.length > 1 && !this.state.request) {
      console.log('ROUTE REQUEST')
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
      .then(response => this.setState({ route: response.results[0].locations[0].properties[0], request: true }))
    }
  }

  renderJourneyTime() {
    if (this.state.request) {
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
    this.requestRouteMidl()
    return (
      this.middleOfRoute(this.renderJourneyTime())
    );
  }
}

export default JourneyTime;
