import React, { useState } from "react";
import "./styles.css";
import NavBar from "./users/NavBar";
import Main from "./Main";

class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        currentUser: ''
      }
    }

  render() {
    console.log(this.state.currentUser)
    return (
      <>
        <div className="NavBarContainer">
          <NavBar
            currentUser={this.state.currentUser}
            setCurrentUser={(user) => this.setState({currentUser: user})}
          />
        </div>
        <div className="MainContainer">
          <Main currentUser={this.state.currentUser} />
        </div>
      </>
    )
  }
}

export default App;
