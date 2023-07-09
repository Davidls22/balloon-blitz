import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native';

const Balloon = ({ balloonBottom, balloonLeft }) => {
  const balloonWidth = 110;
  const balloonHeight = 70;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: balloonBottom,
        left: balloonLeft - balloonWidth / 2,
        width: balloonWidth,
        height: balloonHeight,
      }}
    >
      <Image
        source={require('./hotairballoon.png')}
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Balloon;
