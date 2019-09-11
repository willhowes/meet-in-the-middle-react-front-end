import React from "react";
import "../styles.css";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input style={{ position: "relative", zIndex: 40, left: 115, bottom: 10 }}
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
