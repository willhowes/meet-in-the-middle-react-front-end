import React from "react";
import axios from "axios";
import MidlLocation from "./MidlLocation";

class MidlPlaces extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      this.props.places.map(function(place, i){
        return <div key={i}>{place.name}</div>
      })
    )
  }
}

export default MidlPlaces;
