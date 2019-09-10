import React from "react";
import Bars from "../Recommendations/Bars";
import Restaurants from "../Recommendations/Restaurants";
import Cafes from "../Recommendations/Cafes";
import Lodgings from "../Recommendations/Lodgings";
import Museums from "../Recommendations/Museums";
import Miscellaneous from "../Recommendations/Miscellaneous";

class MidlLocation extends React.Component {
  constructor(props) {
    super(props)
    this.style = this.style.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.props.places)
    console.log(nextProps.places)
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
    return (
      <div className="midlLocationContainer" id='midlLocation' style={this.style()}>
        <p style={{ margin: '10px' }} className="greeting" >
          Your Midl point is: fuck
        </p>
        <div style={{ margin: "10px", overflowY: "scroll", maxHeight:"250px" }}>
          <Bars setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          <Restaurants setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          <Cafes setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          <Lodgings setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          <Museums setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          <Miscellaneous setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
        </div>
      </div>
    );
  }
}

export default MidlLocation;
