import React from "react";
import "../styles.css";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input style={{position:'relative', zIndex: 40, top: 30, left: 110}}
        onClick={() => this.props.onClick(true)}
        id="find_midl"
        className="myButton"
        type="submit"
        value="Find Midl"
      />
    );
  }
}

export default FindMidlButton;
