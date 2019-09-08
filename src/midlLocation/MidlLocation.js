import React from "react";
import MidlPlaces from "./MidlPlaces";

class MidlLocation extends React.Component {

  render() {
    return (
        <div style={{ overflowY: "scroll", maxHeight:"250px" }}>
          <MidlPlaces places={this.props.places} />
        </div>
    );
  }
}

export default MidlLocation;
