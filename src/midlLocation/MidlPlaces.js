import React from "react";

class MidlPlaces extends React.Component {

  render() {
    return (
      this.props.places.map(function(place, i){
        return <div key={i} ><a key={i} href={`www.google.com/${place.name},${place.plus_code.compound_code}`} >{place.name}</a><br></br></div>
      })
    )
  }
}

export default MidlPlaces;
