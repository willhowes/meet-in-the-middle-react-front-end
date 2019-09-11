import React from "react";

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
