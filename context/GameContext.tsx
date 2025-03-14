import React, { createContext } from 'react';
import useGameLogic from '@/hooks/useGameLogic';

interface IGameContext {
  balloonBottom: number;
  balloonLeft: number;
  buildingLeft: number;
  buildingBottom: number;
  buildingWidth: number;
  buildingHeight: number;
  buildingImage: any;
  birdLeft: number;
  birdBottom: number;
  birdIsUp: boolean;
  fuel: number;
  score: number;
  isGameStarted: boolean;
  isGameOver: boolean;
  showGameOverModal: boolean;
  handleTap: () => void;
  startGame: () => void;
  restartGame: () => void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const game = useGameLogic();

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  );
}