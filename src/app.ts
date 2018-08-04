const sJoystick = require('sense-joystick')
const sLeds = require('sense-hat-led')

import { Game } from './models'

let gameIsPaused = false
const Board = new Game()

sLeds.setPixels(Board.state)

sJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (direction: string) => {
    if (gameIsPaused) {
      return
    }

    if (direction === 'left' || direction === 'right') {
      Board.moveIndicator(direction)
      sLeds.setPixels(Board.state)
      return
    }

    if (!Board.moveIsValid()) {
      return
    }

    Board.applyMove()

    if (Board.hasWin()) {
      gameIsPaused = true

      sLeds.showMessage('Winner!', 0.1, Board.indicator.color, () => {
        gameIsPaused = false
        Board.clear()
        Board.takeTurns()
        sLeds.setPixels(Board.state)
      })
      return
    }

    if (Board.isFull()) {
      Board.clear()
    }

    Board.takeTurns()
    sLeds.setPixels(Board.state)
  })
})
