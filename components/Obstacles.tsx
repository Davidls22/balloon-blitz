import React from 'react';
import { View, Image } from 'react-native';

type Props = {
  left: number;
  bottom: number;
  width: number;
  height: number;
  image: any; 
};

export default function Obstacles({ left, bottom, width, height, image }: Props) {
  if (!image) return null;

  return (
    <View
      style={{
        position: 'absolute',
        width,
        height,
        left,
        bottom,
      }}
    >
      <Image
        source={image}
        style={{ width: '100%', height: '100%' }}
        resizeMode="stretch"
      />
    </View>
  );
}