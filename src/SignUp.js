import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(query, event) {
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Name
        </p>
        <form
          // onSubmit={e => {
          //   this.handleSubmit(query, e);
          // }}
        >
          <input
            id="user_name"
            type="text"
            placeholder={"Name"}
            value={this.state.name}
          />
        </form>
      </div>

    );
  }
}

export default SignUp;
