import React from "react";
import MidlPlaces from "./MidlPlaces";

class MidlLocation extends React.Component {

  render() {
    return (
      <div id='midlLocation' style={{margin: 10}}>
        <p className="greeting" >
          Your Midl point is: {this.props.midlLocation}
        </p>
        <div style={{ overflowY: "scroll", maxHeight:"250px" }}>
          <MidlPlaces places={this.props.places} />
        </div>
      </div>
    );
  }
}

export default MidlLocation;
