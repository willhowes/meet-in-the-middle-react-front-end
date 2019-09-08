import React from "react";
import "../styles.css";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input style={{position:'relative', left:'100px'}}
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
