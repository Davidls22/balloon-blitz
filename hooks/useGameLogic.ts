import { useState, useRef, useEffect } from "react";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function isColliding(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
  ): boolean {
    if (x1 + w1 < x2 || x2 + w2 < x1) return false;
    if (y1 + h1 < y2 || y2 + h2 < y1) return false;
    return true;
  }

export default function useGameLogic() {
  const balloonW = 60;
  const balloonH = 60;
  const balloonMargin = 20;
  const buildingMargin = 40;
  const gravity = 3;
  const jumpHeight = 55;
  const buildingSpeed = 4;
  const birdSpeed = 5;
  const [balloonBottom, setBalloonBottom] = useState(SCREEN_HEIGHT / 2);
  const balloonLeft = SCREEN_WIDTH / 2 - balloonW / 2;
  const [buildingLeft, setBuildingLeft] = useState(SCREEN_WIDTH);
  const [buildingBottom] = useState(0);
  const [buildingWidth, setBuildingWidth] = useState(300);
  const [buildingHeight, setBuildingHeight] = useState(400);
  const [buildingImage, setBuildingImage] = useState(null);
  const [birdLeft, setBirdLeft] = useState(SCREEN_WIDTH + 300);
  const [birdBottom, setBirdBottom] = useState(SCREEN_HEIGHT * 0.6);
  const [birdIsUp, setBirdIsUp] = useState(true);
  const [fuel, setFuel] = useState(100);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const gameTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const buildingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const birdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const birdFlapTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const buildingImages = [
    require("./../assets/images/obstacleImage1.png"),
    require("./../assets/images/obstacleImage2.png"),
    require("./../assets/images/obstacleImage3.png"),
    require("./../assets/images/obstacleImage4.png"),
  ];

  const randomBirdY = () => {
    const minY = SCREEN_HEIGHT * 0.2;
    const maxY = SCREEN_HEIGHT * 0.8;
    return Math.floor(Math.random() * (maxY - minY)) + minY;
  };

  const loadRandomBuilding = () => {
    const i = Math.floor(Math.random() * buildingImages.length);
    setBuildingImage(buildingImages[i]);
    const w = 250 + Math.floor(Math.random() * 100);
    const h = 300 + Math.floor(Math.random() * 200);
    setBuildingWidth(w);
    setBuildingHeight(h);
  };

  const handleTap = () => {
    if (!isGameStarted || isGameOver || isFrozen) return;
    if (fuel <= 0) return;
    setBalloonBottom((p) => p + jumpHeight);
    setFuel((p) => Math.max(0, p - 6));
  };

  const startGame = () => {
    if (isGameStarted) return;
    setBalloonBottom(SCREEN_HEIGHT / 2);
    setBuildingLeft(SCREEN_WIDTH);
    setBirdLeft(SCREEN_WIDTH + 300);
    setBirdBottom(randomBirdY());
    setFuel(100);
    setScore(0);
    setIsGameOver(false);
    setShowGameOverModal(false);
    setIsGameStarted(true);
    setIsFrozen(false);
    loadRandomBuilding();
    if (gameTimer.current) clearInterval(gameTimer.current);
    if (buildingTimer.current) clearInterval(buildingTimer.current);
    if (birdTimer.current) clearInterval(birdTimer.current);
    if (birdFlapTimer.current) clearInterval(birdFlapTimer.current);
    gameTimer.current = setInterval(() => {
      setBalloonBottom((p) => p - gravity);
    }, 30);
    buildingTimer.current = setInterval(() => {
      setBuildingLeft((p) => p - buildingSpeed);
    }, 30);
    birdTimer.current = setInterval(() => {
      setBirdLeft((p) => p - birdSpeed);
    }, 30);
    birdFlapTimer.current = setInterval(() => {
      setBirdIsUp((p) => !p);
    }, 250);
  };

  const restartGame = () => {
    setIsGameStarted(false);
    startGame();
  };

  const gameOver = () => {
    setIsGameOver(true);
    setShowGameOverModal(true);
    if (gameTimer.current) clearInterval(gameTimer.current);
    if (buildingTimer.current) clearInterval(buildingTimer.current);
    if (birdTimer.current) clearInterval(birdTimer.current);
    if (birdFlapTimer.current) clearInterval(birdFlapTimer.current);
  };

  useEffect(() => {
    if (!isGameStarted) return;
    if (buildingLeft + buildingWidth < 0) {
      setBuildingLeft(SCREEN_WIDTH);
      loadRandomBuilding();
      setScore((p) => p + 1);
    }
  }, [buildingLeft]);

  useEffect(() => {
    if (!isGameStarted) return;
    if (birdLeft + 40 < 0) {
      setBirdLeft(SCREEN_WIDTH + 200);
      setBirdBottom(randomBirdY());
      setScore((p) => p + 2);
    }
  }, [birdLeft]);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;
    if (balloonBottom <= 0 || balloonBottom + balloonH >= SCREEN_HEIGHT) {
      gameOver();
      return;
    }
    const balloonBox = {
      x: balloonLeft + balloonMargin,
      y: balloonBottom + balloonMargin,
      w: balloonW - balloonMargin * 2,
      h: balloonH - balloonMargin * 2,
    };
    const buildingBox = {
      x: buildingLeft + buildingMargin,
      y: buildingBottom,
      w: buildingWidth - buildingMargin * 2,
      h: buildingHeight,
    };
    const birdBox = {
      x: birdLeft + 10,
      y: birdBottom + 10,
      w: 30 - 20,
      h: 30 - 20,
    };
    if (
      buildingLeft < SCREEN_WIDTH &&
      isColliding(
        balloonBox.x,
        balloonBox.y,
        balloonBox.w,
        balloonBox.h,
        buildingBox.x,
        buildingBox.y,
        buildingBox.w,
        buildingBox.h
      )
    ) {
      gameOver();
      return;
    }
    if (
      birdLeft < SCREEN_WIDTH &&
      isColliding(
        balloonBox.x,
        balloonBox.y,
        balloonBox.w,
        balloonBox.h,
        birdBox.x,
        birdBox.y,
        birdBox.w,
        birdBox.h
      )
    ) {
      gameOver();
      return;
    }
  }, [balloonBottom, buildingLeft, birdLeft, isGameStarted, isGameOver]);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;
    if (fuel <= 0) {
      setIsFrozen(true);
      const t = setTimeout(() => {
        setIsFrozen(false);
        setFuel(30);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [fuel, isGameStarted, isGameOver]);

  useEffect(() => {
    if (!isGameStarted || isGameOver || isFrozen) return;
    const rechargeTimer = setInterval(() => {
      setFuel((prevFuel) =>
        prevFuel < 100 ? Math.min(100, prevFuel + 1) : prevFuel
      );
    }, 100);
    return () => clearInterval(rechargeTimer);
  }, [isGameStarted, isGameOver, isFrozen]);

  useEffect(() => {
    return () => {
      if (gameTimer.current) clearInterval(gameTimer.current);
      if (buildingTimer.current) clearInterval(buildingTimer.current);
      if (birdTimer.current) clearInterval(birdTimer.current);
      if (birdFlapTimer.current) clearInterval(birdFlapTimer.current);
    };
  }, []);

  const [currentBuildingSpeed, setCurrentBuildingSpeed] = useState(buildingSpeed);
  const [currentBirdSpeed, setCurrentBirdSpeed] = useState(birdSpeed);

  useEffect(() => {
    if (!isGameStarted) return;
    const speedOffset = Math.floor(score / 10); 
    const newBuildingSpeed = buildingSpeed + speedOffset;
    const newBirdSpeed = birdSpeed + speedOffset;

    if (currentBuildingSpeed !== newBuildingSpeed && buildingTimer.current) {
      setCurrentBuildingSpeed(newBuildingSpeed);
      clearInterval(buildingTimer.current);
      buildingTimer.current = setInterval(() => {
        setBuildingLeft((p) => p - newBuildingSpeed);
      }, 30);
    }

    if (currentBirdSpeed !== newBirdSpeed && birdTimer.current) {
      setCurrentBirdSpeed(newBirdSpeed);
      clearInterval(birdTimer.current);
      birdTimer.current = setInterval(() => {
        setBirdLeft((p) => p - newBirdSpeed);
      }, 30);
    }
  }, [score, isGameStarted]);

  return {
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
    fuel,
    score,
    isGameStarted,
    isGameOver,
    showGameOverModal,
    handleTap,
    startGame,
    restartGame,
  };
}
