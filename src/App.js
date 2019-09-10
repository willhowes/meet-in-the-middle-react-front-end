import React, { useState } from "react";
import "./styles.css";
import NavBar from "./users/NavBar";
import Main from "./Main";

// Function component instead of Class component
export const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <>
      <div className="NavBarContainer">
        <NavBar
          currentUser={currentUser} 
          setCurrentUser={(user) => setCurrentUser(user)}
        />
      </div>
      <div className="MainContainer">
        <Main currentUser={currentUser} />
      </div>
    </>
  )
}

// export class App extends React.Component {
//   constructor() {
//     this.state = {
//       currentUser: ""
//     }
//   }

//   render() {
//     return (
//       <>
//         <div className="NavBarContainer">
//           <NavBar
//             currentUser={this.state.currentUser} 
//             setCurrentUser={(user) => this.setState({ currentUser: user})}
//           />
//         </div>
//         <div className="MainContainer">
//           <Main currentUser={this.state.currentUser} />
//         </div>
//       </>
//     )
//   }
// }
