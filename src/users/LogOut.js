import React from "react";
import axios from "axios";

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showLogOut: true,
      showLogIn: false,
      loggedIn: false
    };

    this._onSelectLogOut = this._onSelectLogOut.bind(this);
    this._onSelectStayLoggedIn = this._onSelectStayLoggedIn.bind(this);
  }

  _onSelectLogOut(e) {
    e.preventDefault();
    axios
      .delete("http://localhost:3001/sessions/delete")
      .then(response => {
        this.setState(state => ({
          showLogIn: false,
          loggedIn: false,
          showLogOut: false
        }));
      })
      .then(response => this.props.updateCurrentUser({ name: ''}))
      .catch(error => {});
  }

  _onSelectStayLoggedIn(e) {
    e.preventDefault();
    this.setState(state => ({ showLogIn: false, showLogOut: false }));
  }

  render() {
    return (
      <div>
        {this.state.showLogOut ? (
          <div className="signUpContainer">
            <form
              onSubmit={e => {
                this.onSubmit(e);
              }}
            >
              <center>
                {" "}
                <div className="signUpForm">
                  <img alt="hello world" className="formLogo" src="midl-logo.png" />
                  <div className="formHeading">
                    Are you sure you would like to log out?
                  </div>

                  <button
                    id="log_in_submit"
                    className="enterButton"
                    style={{ top: "-32px" }}
                    onClick={this._onSelectLogOut}
                  >
                    Yes
                  </button>

                  <button
                    id="log_in_submit"
                    className="enterButton"
                    style={{ top: "-32px", left: "4px" }}
                    onClick={this._onSelectStayLoggedIn}
                  >
                    No
                  </button>
                </div>
              </center>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LogOut;
