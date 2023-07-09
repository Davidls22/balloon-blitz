import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import obstacleImage1 from './obstacleImage1.png';
import obstacleImage2 from './obstacleImage2.png';
import obstacleImage3 from './obstacleImage3.png';
import obstacleImage4 from './obstacleImage4.png';

const buildingImages = [
  { source: obstacleImage1, width: 450, height: 400 },
  { source: obstacleImage2, width: 440, height: 350 },
  { source: obstacleImage3, width: 420, height: 480 },
  { source: obstacleImage4, width: 380, height: 400 },
];

const Obstacles = ({ obstaclesLeft, isMoving, onCollision }) => {
  const [obstacleImage, setObstacleImage] = useState(null);
  const [obstaclesWidth, setObstaclesWidth] = useState(0);
  const [obstaclesHeight, setObstaclesHeight] = useState(0);
  const [obstaclesBottom, setObstaclesBottom] = useState(0);

  useEffect(() => {
    if (isMoving) {
      setObstaclesBottom(-50); // Set the initial bottom position outside the visible area

      const randomIndex = Math.floor(Math.random() * buildingImages.length);
      const { source, width, height } = buildingImages[randomIndex];
     
      setObstacleImage(source);
      setObstaclesWidth(width);
      setObstaclesHeight(height);
    }
  }, [isMoving]);

  useEffect(() => {
    if (isMoving) {
      const obstacleMovementInterval = setInterval(() => {
        obstaclesLeft -= 4; // Update the obstaclesLeft directly by subtracting 4
      }, 0);

      return () => {
        clearInterval(obstacleMovementInterval);
      };
    }
  }, [isMoving]);

  return (
    <>
      <Image
        source={obstacleImage}
        style={{
          position: 'absolute',
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft - obstaclesWidth,
          bottom: obstaclesBottom,
        }}
      />
    </>
  );
};

export default Obstacles;
