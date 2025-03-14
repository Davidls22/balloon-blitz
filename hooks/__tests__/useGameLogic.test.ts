import { renderHook, act } from "@testing-library/react";
import useGameLogic from "../useGameLogic";

test("initial state", () => {
  const { result } = renderHook(() => useGameLogic());
  expect(result.current.isGameStarted).toBe(false);
  expect(result.current.isGameOver).toBe(false);
  expect(result.current.score).toBe(0);
  expect(result.current.fuel).toBe(100);
});

test("startGame updates state", () => {
  const { result } = renderHook(() => useGameLogic());
  act(() => {
    result.current.startGame();
  });
  expect(result.current.isGameStarted).toBe(true);
  expect(result.current.isGameOver).toBe(false);
});

jest.useFakeTimers();

test("handleTap changes balloonBottom when game is running", () => {
  const { result } = renderHook(() => useGameLogic());

  act(() => {
    result.current.startGame();
  });

  const initial = result.current.balloonBottom;

  act(() => {
    result.current.handleTap();
    jest.advanceTimersByTime(0);
  });

  expect(result.current.balloonBottom).toBeGreaterThan(initial);
});
