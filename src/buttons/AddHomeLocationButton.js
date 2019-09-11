import React from "react";

class AddHomeLocationButton extends React.Component {

  render() {
    return (
      <input style={{position:'relative', zIndex: 40, top: 30, left: 110}}
        onClick={() => this.props.onClick(true)}
        id="home_location_button"
        className="myButton"
        type="submit"
        value="Home Location"
      />
    );
  }
}

export default AddHomeLocationButton;
