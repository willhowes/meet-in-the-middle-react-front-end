import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls onSubmit when location is submitted', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  const onSubmitFn = jest.fn();
  const wrapper = mount(<Form onSubmit={onSubmitFn}/>);

  const form = wrapper.find('form');
  form.simulate('submit');
  expect(onSubmitFn).toHaveBeenCalledTimes(1);


});
