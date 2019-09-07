import React from "react";

class MidlPlaces extends React.Component {

  render() {
    return (
      this.props.places.map(function(place, i){
        return <div key={i}>{place.name}</div>
      })
    )
  }
}

export default MidlPlaces;
