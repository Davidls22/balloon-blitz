import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

const Bird = ({ screenWidth }) => {
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    const birdTimerId = setInterval(() => {
      setIsUp((isUp) => !isUp);
    }, 500);

    return () => {
      clearInterval(birdTimerId);
    };
  }, []);

  return (
    <Image
      source={isUp ? require("./BirdUp.png") : require("./BirdDown.png")}
      style={[styles.bird, { left: screenWidth }]}
    />
  );
};

const styles = StyleSheet.create({
  bird: {
    position: "absolute",
    top: 280,
    width: 50,
    height: 50,
  },
});

export default Bird;
