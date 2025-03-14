import React from 'react';
import { View, Image } from 'react-native';

type Props = {
  left: number;
  bottom: number;
  isUp: boolean;
};

export default function Bird({ left, bottom, isUp }: Props) {
  const size = 40;

  return (
    <View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left,
        bottom,
      }}
    >
      <Image
        source={
          isUp
            ? require('../assets/images/BirdUp.png')
            : require('../assets/images/BirdDown.png')
        }
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
}