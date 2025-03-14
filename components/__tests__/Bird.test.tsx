import React from 'react';
import renderer from 'react-test-renderer';
import Bird from '../Bird';

test('renders bird up', () => {
  const tree = renderer.create(<Bird left={50} bottom={100} isUp />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders bird down', () => {
  const tree = renderer.create(<Bird left={50} bottom={100} isUp={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});