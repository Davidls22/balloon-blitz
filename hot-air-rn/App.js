import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import Balloon from "./Balloon";
import Obstacles from "./Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width * 2;
  const screenHeight = Dimensions.get("screen").height;
  const balloonLeft = screenWidth / 50;
  const [fuel, setFuel] = useState(99);
  const [balloonBottom, setBalloonBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth + 10);
  const gravity = 3;
  const obstaclesHeight = 300;
  const obstaclesWidth = 250;
  const [isMoving, setIsMoving] = useState(false);
  let gameTimerId;
  let obstaclesLeftTimerId;
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      if (balloonBottom > 0) {
        gameTimerId = setInterval(() => {
          setBalloonBottom((balloonBottom) => balloonBottom - gravity);

          if (fuel <= 98) {
            setFuel((fuel) => fuel + 1);
          }
        }, 30);
      }

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [balloonBottom, isGameStarted]);

  useEffect(() => {
    if (isGameStarted) {
      if (obstaclesLeft > -obstaclesWidth) {
        obstaclesLeftTimerId = setInterval(() => {
          setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 4);
          setIsMoving(true);
        }, 30);

        return () => {
          clearInterval(obstaclesLeftTimerId);
        };
      } else {
        setObstaclesLeft(screenWidth);
        setIsMoving(false);
        setScore((score) => score + 1);
      }
    }
  }, [obstaclesLeft, screenWidth, isGameStarted, score]);

  const jump = () => {
    if (
      (isGameStarted || isGameOver) &&
      balloonBottom <= screenHeight &&
      fuel > 0 &&
      canJump
    ) {
      setBalloonBottom((balloonBottom) => balloonBottom + 50);
      setFuel((fuel) => fuel - 15);
      setCanJump(false);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      if (fuel <= 12) {
        setCanJump(false);
        const timeoutId = setTimeout(() => {
          setFuel(1);
        }, 4000);

        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        setCanJump(true);
      }
    }
  }, [fuel, isGameStarted]);

  useEffect(() => {
    const checkCollision = () => {
      if (
        isGameStarted &&
        balloonBottom < obstaclesHeight &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 10
      ) {
        gameOver();
        setShowGameOverModal(true);
        setCanJump(false); // Disable jumping when game is over
      }
    };
    checkCollision();
  }, [
    balloonBottom,
    obstaclesHeight,
    obstaclesLeft,
    screenWidth,
    setCanJump,
    isGameStarted,
  ]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const restartGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setShowGameOverModal(false);
    setFuel(99);
    setBalloonBottom(screenHeight / 2);
    setObstaclesLeft(screenWidth + 10);
    setIsMoving(false);
    setScore(0);
    setCanJump(true);
  };

  const gameOver = () => {
    if (gameTimerId) clearInterval(gameTimerId);
    if (obstaclesLeftTimerId) clearInterval(obstaclesLeftTimerId);

    // Set isGameOver to true

    setIsGameOver(true);
  };

  if (!isGameStarted) {
    return (
      <ImageBackground
        source={require("./hotAirBackground.png")}
        style={styles.startGameContainer}
      >
        <View style={styles.logoContainer}>
          <Image source={require("./Logo.png")} style={styles.logoImage} />
        </View>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <ImageBackground
        source={require("./skyline.png")}
        style={styles.container}
      >
        <View style={styles.container}>
          {/* Render the Balloon component */}
          <Balloon
            balloonBottom={balloonBottom}
            balloonLeft={balloonLeft}
            obstaclesLeft={obstaclesLeft}
          />
          {/* Render the Obstacles component */}
          <Obstacles
            obstaclesHeight={obstaclesHeight}
            obstaclesWidth={obstaclesWidth}
            obstaclesLeft={obstaclesLeft}
            isMoving={isMoving}
          />
          {/* Render the fuel text */}
          <Text
            style={[styles.fuelText, fuel <= 0 && styles.fuelTextRed]}
          >{`Fuel: ${fuel}%`}</Text>
        </View>
        {/* Render the game over modal when isGameOver is true */}
        {showGameOverModal && (
          <Modal visible={showGameOverModal} transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Render the game over text */}
                <Text style={styles.gameOverText}>GAME OVER</Text>
                {/* Render the score text */}
                <Text style={styles.scoreText}>Score: {score}</Text>
                {/* Render the restart game button */}
                <Button title="Restart Game" onPress={restartGame} />
              </View>
            </View>
          </Modal>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fuelText: {
    position: "absolute",
    top: 80,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  fuelTextRed: {
    position: "absolute",
    top: 80,
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  startGameContainer: {
    flex: 1,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    fontFamily: "System",
  },
  logoImage: {
    width: 380, // Adjust the width as per your desired size
    height: 200, // Adjust the height as per your desired size
    marginTop: 80,
    marginBottom: 200,
    resizeMode: "contain", // Ensures the logo image fits within the defined dimensions
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
