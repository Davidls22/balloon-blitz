import React from 'react';
import renderer from 'react-test-renderer';
import Balloon from '../Balloon';

test('renders balloon', () => {
  const tree = renderer.create(<Balloon bottom={100} left={50} />).toJSON();
  expect(tree).toMatchSnapshot();
});