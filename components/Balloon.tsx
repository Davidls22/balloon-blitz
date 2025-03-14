import React from 'react';
import { View, Image } from 'react-native';

type Props = {
  bottom: number;
  left: number;
};

export default function Balloon({ bottom, left }: Props) {
  const balloonSize = 60;

  return (
    <View
      style={{
        position: 'absolute',
        width: balloonSize,
        height: balloonSize,
        left,
        bottom,
      }}
    >
      <Image
        source={require('../assets/images/hotairballoon.png')}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
}