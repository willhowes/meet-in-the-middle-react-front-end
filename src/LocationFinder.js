/*global google*/

import React from "react";
import "./styles.css";
import LocationForm from "./LocationForm.js"

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationForms: 2
    };
    this.addForm = this.addForm.bind(this);
  }

  addForm() {
    this.setState({ locationForms: (this.state.locationForms + 1)})
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        {Array(this.state.locationForms).fill().map(Math.random).map(function(item, i){
          if (i === 0) {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Where are you?'}
              greeting={'First Enter Your Location'}
              updateMarkers={this.props.updateMarkers}
              />
          } else {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Enter another location'}
              greeting={'Enter Another Location'}
              updateMarkers={this.props.updateMarkers}
              />
          }
        }, this)}
        <input
          onClick={this.props.addMidlMarker}
          id="find_midl"
          className="myButton"
          type="submit"
          value="Find Midl"
        />
        <input
          onClick={this.addForm}
          id="add_location"
          className="myButton"
          type="submit"
          value="Add Location"
        />
      </div>
    );
  }
}

export default LocationFinder;
