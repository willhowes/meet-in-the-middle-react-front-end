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

  openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(cityName).hidden = false;
  }

  render() {
    return (
      <div className="midlLocationContainer" id='midlLocation' style={this.style()}>
        <div style={{ margin: "10px", overflowY: "scroll", maxHeight:"250px" }}>
          
        <Tabs>
          <div label='Bars'>
            <Bars setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
          </div>
          <div label='Restaurants'>
            <Restaurants setMidlRequest={this.props.setMidlRequest} places={this.props.places} />
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
