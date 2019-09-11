import React from "react";
import "../styles.css";
import LocationForm from "./LocationForm.js"
import FindMidlButton from "../buttons/FindMidlButton.js"
import TransportTypeSelector from "./TransportTypeSelector.js"
import FadeIn from 'react-fade-in';
import Datetime from 'react-datetime';

class LocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationForms: 2
    };
  }

  render() {

    let midlButton;

    if (this.props.markers.length > 1) {
      midlButton = <FadeIn><FindMidlButton onClick={this.props.addMidlMarker}/></FadeIn>
    } else {
      midlButton = null
    }

    return (
      <div style={{ margin: 10 }}>
        {Array(this.state.locationForms).fill().map(Math.random).map(function(item, i){
          if (i === 0) {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Where are you?'}
              greeting={'First enter your location'}
              updateMarkers={this.props.updateMarkers}
              />
          } else {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Enter another location'}
              greeting={'Then enter another location'}
              updateMarkers={this.props.updateMarkers}
              />
          }
        }, this)}
        <TransportTypeSelector changeMidlJourneyType={this.props.changeMidlJourneyType} />
        {midlButton}
      </div>
    );
  }
}

export default LocationContainer;
