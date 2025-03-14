import React from 'react';
import renderer from 'react-test-renderer';
import Obstacles from '../Obstacles';

test('renders obstacle', () => {
  const mockImage = { uri: 'mockImage' };
  const tree = renderer
    .create(<Obstacles left={50} bottom={100} width={100} height={200} image={mockImage} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders null if no image', () => {
  const tree = renderer
    .create(<Obstacles left={50} bottom={100} width={100} height={200} image={null} />)
    .toJSON();
  expect(tree).toBeNull();
});