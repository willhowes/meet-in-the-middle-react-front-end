import React from "react";
import Tabs from '../tabs/Tabs'
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

        <Tabs>
          <div label='Bars'>
            <Bars setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Restaurants' >
            <Restaurants id="Restaurants" setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Cafes'>
            <Cafes setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Hotels'>
            <Lodgings setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Museums'>
            <Museums setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Other'>
            <Miscellaneous setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
        </Tabs>

        </div>
      </div>
    );
  }
}

export default MidlLocation;
