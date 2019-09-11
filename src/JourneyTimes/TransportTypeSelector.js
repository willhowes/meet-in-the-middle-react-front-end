import React from "react";
import { FaWalking, FaSubway, FaCar } from 'react-icons/fa';
import { IoMdBicycle } from "react-icons/io";

class TransportTypeSelector extends React.Component {

  checked(type){
    if (this.props.journeyType() === type) {
      return "checked"
    } else {
      return false
    }
  }

  render() {
    return (
      <div style={{ margin: 10, position:"relative", bottom:"32px", right:"20px"  }}>
        <form>
          <label onClick={this.handleClick} className="container">
            <input style={{margin:"3px"}} type="radio" name="radio"/>
            <span id={`transit_Button_Journey${this.props.num}`} onClick={() => this.props.changeJourneyType("transit")} className="checkmark"><div className="transportIcon"><FaSubway /></div></span>
          </label>
          <label checked={this.checked("walking")} onClick={this.handleClick} className="container">
            <input style={{margin:"3px"}} type="radio" name="radio" />
            <span id={`walking_Button_Journey${this.props.num}`} onClick={()=>this.props.changeJourneyType("walking")} className="checkmark"><div className="transportIcon"><FaWalking /></div></span>
          </label>
          <label checked={this.checked("driving")} onClick={this.handleClick} className="container">
            <input style={{margin:"3px"}} type="radio" name="radio" />
            <span id={`driving_Button_Journey${this.props.num}`} onClick={() => this.props.changeJourneyType("driving")} className="checkmark"><div className="transportIcon"><FaCar /></div></span>
          </label>
          <label checked={this.checked("bicycling")} onClick={this.handleClick} className="container">
            <input style={{margin:"3px"}} type="radio" name="radio" />
            <span id={`bicycling_Button_Journey${this.props.num}`} onClick={() => this.props.changeJourneyType("bicycling")} className="checkmark"><div className="transportIcon"><IoMdBicycle /></div></span>
          </label>
        </form>
      </div>
    );
  }
}

export default TransportTypeSelector;
