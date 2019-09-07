import React from "react";
import "../styles.css";
import LocationForm from "./LocationForm.js"
import FindMidlButton from "../buttons/FindMidlButton.js"
import AddLocationButton from "../buttons/AddLocationButton.js"
import ResetButton from "../buttons/ResetButton.js"

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
        <FindMidlButton onClick={this.props.addMidlMarker}/>
        <AddLocationButton onClick={this.addForm}/>
        <ResetButton onClick={this.props.reset}/>
      </div>
    );
  }
}

export default LocationFinder;
