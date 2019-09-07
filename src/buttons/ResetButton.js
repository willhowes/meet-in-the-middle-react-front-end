import React from "react";
import "../styles.css";

class ResetButton extends React.Component {

  render() {
    return (
      <input
        onClick={this.props.onClick}
        id="add_location"
        className="myButton"
        type="submit"
        value="RESET"
      />
    );
  }
}

export default ResetButton;
