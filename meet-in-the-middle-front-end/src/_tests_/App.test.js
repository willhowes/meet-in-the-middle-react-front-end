import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import MidlLocation from '../MidlLocation.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

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
