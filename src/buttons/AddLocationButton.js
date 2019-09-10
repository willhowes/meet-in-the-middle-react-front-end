import React from "react";
import "../styles.css";

class AddLocationButton extends React.Component {

  render() {
    return (
      <input
        onClick={this.props.onClick}
        id="add_location"
        className="myButton"
        type="submit"
        value="Add Location"
      />
    );
  }
}

export default AddLocationButton;
