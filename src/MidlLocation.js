import React from "react";

class MidlLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Your Midl point is: {this.props.midlLocation}
        </p>
      </div>
    );
  }
}

export default MidlLocation;
