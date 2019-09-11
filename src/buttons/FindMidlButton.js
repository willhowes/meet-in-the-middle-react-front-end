import React from "react";
import "../styles.css";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input style={{ zIndex: 40, top: 40, left: 110}}
        onClick={() => this.props.onClick(true)}
        id="find_midl"
        className="myButton"
        type="submit"
        value="Midl"
      />
    );
  }
}

export default FindMidlButton;
