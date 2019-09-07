import React from "react";
import "../styles.css";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input
        onClick={this.props.onClick}
        id="find_midl"
        className="myButton"
        type="submit"
        value="Find Midl"
      />
    );
  }
}

export default FindMidlButton;
