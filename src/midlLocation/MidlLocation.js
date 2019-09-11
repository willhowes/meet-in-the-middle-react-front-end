import React from "react";
import MidlPlaces from "./MidlPlaces";


class MidlLocation extends React.Component {
  constructor(props) {
    super(props)
    this.style = this.style.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.places !== nextProps.places) {
      return true
    } else {
      return false
    }
  }

  style(){
    if (this.props.midlLocation) {
      return {
        visibility: "visible"
      }
    } else {
      return {
        visibility: "hidden"
      }
    }
  }

  render() {
    console.log("the middle area in midllocation coponent");
    console.log(this.props.midlArea);
    return (
      <div className="midlLocationContainer" id='midlLocation' style={this.style()}>
        <p style={{ margin: '10px' }} className="greeting" >
          Your Midl point is: {this.props.midlArea}

        </p>
        <div style={{ margin: "10px", overflowY: "scroll", maxHeight:"250px" }}>
          <MidlPlaces setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
        </div>
      </div>
    );
  }
}

export default MidlLocation;
