import React from "react";

class MidlPlaces extends React.Component {

  render() {
    console.log(this.props.places)
    if (this.props.places.length > 0) {
      this.props.setMidlRequest(false)
    }
    return (
      this.props.places.map(function(place, i){
        return <div key={i} ><a key={i} href={`www.google.com/${place.name},${place.plus_code.compound_code}`} >{place.name}</a><br></br></div>
      })
    )
  }
}

export default MidlPlaces;
