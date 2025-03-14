import React from 'react'
import renderer from 'react-test-renderer'
import { GameProvider, GameContext } from '../GameContext'

test('provides context values', () => {
  let ctx: any
  function TestConsumer() {
    ctx = React.useContext(GameContext)
    return null
  }
  renderer.create(
    <GameProvider>
      <TestConsumer />
    </GameProvider>
  )
  expect(ctx).toBeDefined()
  expect(typeof ctx.handleTap).toBe('function')
  expect(typeof ctx.startGame).toBe('function')
  expect(typeof ctx.restartGame).toBe('function')
})