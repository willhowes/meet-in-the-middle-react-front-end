import React from "react";
import "../styles.css";
import LocationForm from "./LocationForm.js"
import FindMidlButton from "../buttons/FindMidlButton.js"
import TransportTypeSelector from "./TransportTypeSelector.js"
import FadeIn from 'react-fade-in';
import TextField from '@material-ui/core/TextField';

class LocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationForms: 2,
    };
    this.onEnterDate = this.onEnterDate.bind(this)
  }

  onEnterDate(event){
    this.props.meetTime(event.target.value)
  }

  render() {

    let midlButton;

    if (this.props.markers.length > 1) {
      midlButton = <FadeIn><FindMidlButton onClick={this.props.addMidlMarker}/></FadeIn>
    } else {
      midlButton = null
    }

    let today = new Date()
    let formatted_now = new Date(today.getFullYear(), (today.getMonth()), today.getDate(), today.getHours() + 1, today.getMinutes());
    let formatted_date = formatted_now.toISOString().slice(0, -8)
    return (
      <div style={{ margin: 10 }}>
        {Array(this.state.locationForms).fill().map(Math.random).map(function(item, i){
          if (i === 0) {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Where are you?'}
              greeting={'First enter your location'}
              updateMarkers={this.props.updateMarkers}
              currentUser={this.props.currentUser}
              />
          } else {
            return <LocationForm
              key={i}
              formNum={i}
              placeholder={'Enter another location'}
              greeting={'Then enter another location'}
              updateMarkers={this.props.updateMarkers}
              currentUser={this.props.currentUser}
              />
          }
        }, this)}
        <form className={{
          display: 'flex',
          margin: 20,
          flexWrap: 'wrap',
        }} noValidate>
          <TextField
            id="datetime-local"
            label="Meet-up time "
            type="datetime-local"
            defaultValue={formatted_date}
            onChange={event => {
              this.onEnterDate(event)
            }}
            style={{margin: 15}}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <TransportTypeSelector changeMidlJourneyType={this.props.changeMidlJourneyType} />
        {midlButton}
      </div>
    );
  }
}

export default LocationContainer;
