import React from "react";

class FindMidlButton extends React.Component {

  render() {
    return (
      <input style={{ position: "relative", zIndex: 40, left: 115, bottom: 10 }}
        onClick={() => this.props.onClick(true)}
        id="find_midl"
        className="midlButton"
        type="submit"
        value="Midl"
      />
    );
  }
}

export default FindMidlButton;
