import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MidlLocation from '../MidlLocation.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('tests the middle point constructor is working', () => {
  const middlePoint = new MiddlePoint();
  expect(middlePoint.props)
})

// it('returns the middle location', () => {
//     const markers = [{
//     name: "test",
//     position: {lat: 51.5173543, lng: -0.07325469999999999}},
//     {
//     name: "test",
//     position: {lat: 51.5442849, lng: -0.0892427}}
//   ]
//   MidlLocation.midlLocation = jest.fn();
//   const value = MidlLocation.midlLocation();
//   expect(value).toBe(1)
// });

class MidlLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.midlLocation = this.midlLocation.bind(this);
  }

  midlLocation() {
    if (this.props.markers[2]) {
      return `lat: ${this.props.markers[2].position.lat}, lng: ${this.props.markers[2].position.lng}`;
    }
  }
