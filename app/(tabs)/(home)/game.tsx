import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GameContext } from "@/context/GameContext";

import Balloon from "@/components/Balloon";
import Obstacles from "@/components/Obstacles";
import Bird from "@/components/Bird";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function GameScreen() {
  const {
    isGameStarted,
    isGameOver,
    showGameOverModal,
    startGame,
    restartGame,
    handleTap,
    score,
    fuel,

    balloonBottom,
    balloonLeft,
    buildingLeft,
    buildingBottom,
    buildingWidth,
    buildingHeight,
    buildingImage,
    birdLeft,
    birdBottom,
    birdIsUp,
  } = useContext(GameContext);


  useEffect(() => {
    if (!isGameStarted) {
      startGame();
    }
  }, [isGameStarted]);
  

  return (
    <>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../../assets/images/skyline.png")}
            style={styles.background}
          >
            {/* Score */}
            <Text style={styles.scoreText}>Score: {Math.floor(score)}</Text>
            {/* Fuel */}
            <Text style={[styles.fuelText, fuel <= 20 && { color: "red" }]}>
              Fuel: {Math.floor(fuel)}%
            </Text>

            {/* Balloon */}
            <Balloon bottom={balloonBottom} left={balloonLeft} />

            {/* Building (Obstacle) */}
            <Obstacles
              left={buildingLeft}
              bottom={buildingBottom}
              width={buildingWidth}
              height={buildingHeight}
              image={buildingImage}
            />

            {/* Bird */}
            <Bird left={birdLeft} bottom={birdBottom} isUp={birdIsUp} />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

      {/* Game Over Modal */}
      {showGameOverModal && (
        <Modal visible transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalCard}>
              <Text style={styles.gameOverText}>GAME OVER</Text>
              <Text style={styles.scoreModalText}>
                Score: {Math.floor(score)}
              </Text>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={restartGame}
              >
                <Text style={styles.restartButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    position: "absolute",
    top: 60,
    left: 20,
    fontSize: 24,
    color: "royalblue",
    fontWeight: "bold",
  },
  fuelText: {
    position: "absolute",
    top: 100,
    left: 20,
    fontSize: 20,
    color: "blue",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: 300,
    backgroundColor: "#FFFFFFEE",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  gameOverText: {
    fontSize: 32,
    color: "#e53935",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreModalText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
  },
  restartButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  restartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
