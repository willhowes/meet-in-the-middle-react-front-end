import React from "react";
import { FaWalking, FaSubway, FaCar } from 'react-icons/fa';
import { IoMdBicycle } from "react-icons/io";

class TransportTypeSelector extends React.Component {

  shouldComponentUpdate(){
    return false
  }

  render() {
    return (
      <div style={{ margin: 10, position:"relative"}}>
        <form>
          <label className="container">
            <input style={{margin:"3px"}} type="radio" name="radio"/>
            <span
              id="public_transport_Button_Midl"
              onClick={() => this.props.changeMidlJourneyType("public_transport")}
              className="checkmark">
                <div className="transportIcon">
                  <FaSubway />
                </div>
            </span>
          </label>
          <label className="container">
            <input style={{margin:"3px"}} type="radio" name="radio"/>
            <span
              id="walking_Button_Midl"
              onClick={()=>this.props.changeMidlJourneyType("walking")}
              className="checkmark">
                <div className="transportIcon">
                  <FaWalking />
                </div>
            </span>
          </label>
          <label className="container">
            <input style={{margin:"3px"}} type="radio" name="radio"/>
            <span
              id="driving_Button_Midl"
              onClick={() => this.props.changeMidlJourneyType("driving")}
              className="checkmark">
                <div className="transportIcon">
                  <FaCar />
                </div>
            </span>
          </label>
          <label className="container">
            <input style={{margin:"3px"}} type="radio" name="radio"/>
            <span
              id="cycling_Button_Midl"
              onClick={() => this.props.changeMidlJourneyType("cycling")}
              className="checkmark">
                <div className="transportIcon">
                  <IoMdBicycle />
                </div>
            </span>
          </label>
        </form>
      </div>
    );
  }
}

export default TransportTypeSelector;
