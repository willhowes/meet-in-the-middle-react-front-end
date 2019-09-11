import React from "react";
import LocationForm from "./LocationForm.js";
import FindMidlButton from "../buttons/FindMidlButton.js";
import TransportTypeSelector from "./TransportTypeSelector.js";
import PropTypes from "prop-types";

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationForms: 2
    };
    console.log(props.currentUser);
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        {Array(this.state.locationForms)
          .fill()
          .map(Math.random)
          .map(function(item, i) {
            if (i === 0) {
              return (
                <LocationForm
                  key={i}
                  formNum={i}
                  placeholder={"Where are you?"}
                  greeting={"First enter your location"}
                  updateMarkers={this.props.updateMarkers}
                  currentUser={this.props.currentUser}
                />
              );
            } else {
              return (
                <LocationForm
                  key={i}
                  formNum={i}
                  placeholder={"Enter another location"}
                  greeting={"Then enter another location"}
                  updateMarkers={this.props.updateMarkers}
                  currentUser={this.props.currentUser}
                />
              );
            }
          }, this)}
        <TransportTypeSelector
          changeMidlJourneyType={this.props.changeMidlJourneyType}
        />
        <FindMidlButton onClick={this.props.addMidlMarker} />
      </div>
    );
  }
}

LocationFinder.propTypes = {
  currentUser: PropTypes.object
};

export default LocationFinder;
