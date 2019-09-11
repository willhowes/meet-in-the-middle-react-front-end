import React from "react";
import LocationForm from "./LocationForm.js";
import FindMidlButton from "../buttons/FindMidlButton.js";
import TransportTypeSelector from "./TransportTypeSelector.js";
import AddHomeLocationButton from "../buttons/AddHomeLocationButton.js";
import PropTypes from "prop-types";

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.addHomeLocation = React.createRef();
    this.addWorkLocation = React.createRef();
    this.state = {
      locationForms: 2
    };
    console.log(props.currentUser);
  }

  handleClick = () => {
    this.addHomeLocation.current.handleHomeSubmit();
  };

  handleClickWork = () => {
    this.addWorkLocation.current.handleWorkSubmit();
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        <button onClick={this.handleClick}>Home</button>
        <button onClick={this.handleClickWork}>Work</button>
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
                  ref={this.addHomeLocation}
                  ref={this.addWorkLocation}
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
