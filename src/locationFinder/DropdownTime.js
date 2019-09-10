import React from "react";
import "../styles.css";
import onClickOutside from "react-onclickoutside";
import {FontAwesome, FontAwesomeIcon} from 'react-fontawesome';


class DropdownTime extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: 'Leave now',
      options: [{ id: 1, title: "Leave now"}, { id: 2, title: "Leave by"}, { id: 1, title: "Arrive by"}]
    }
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  makeSelection(header){
    this.setState({ headerTitle: header, listOpen: false })
  }

  render(){
    const{listOpen, headerTitle, makeSelection} = this.state
    return (
          <div className="ddMenuTime">
          <FontAwesomeIcon icon="angle-up" />
          <FontAwesome name="angle-up" size="2x"/>
            <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle}</div>
              {listOpen
                ? <FontAwesome name="angle-up" size="2x"/>
                : <FontAwesome name="angle-down" size="2x"/>
              }
              </div>
              {listOpen && <div className="dd-list">
              {this.state.options.map((item) => (
               <div
               className="dd-list-item"
               onClick={() => this.makeSelection(item.title)}
               key={item.id} >
               {item.title}
               </div>
              ))}
            </div>}
          </div>
    )
  }
}

export default DropdownTime;
