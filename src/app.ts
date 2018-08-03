const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

import { Game } from './models'
import { RED_COLOR, GREEN_COLOR } from './constants'

let declaringWinner = false
const Board = new Game()
const players = [RED_COLOR, GREEN_COLOR]
let currentPlayerIdx = 0

Board.setIndicator(players[currentPlayerIdx])
senseLeds.setPixels(Board.state)

senseJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (value: string) => {
    if (value === 'left' || value === 'right') {
      Board.moveIndicator(value)
    } else {
      if (!Board.moveIsValid() || declaringWinner) {
        return
      }

      Board.applyMove()

      if (Board.hasWin()) {
        declaringWinner = true
        senseLeds.showMessage('Winner', 0.2, Board.indicator.color, () => {
          declaringWinner = false
          Board.clear()
          Board.setIndicator(players[currentPlayerIdx])
          senseLeds.setPixels(Board.state)
        })
        return
      }

      if (Board.isFull()) {
        Board.clear()
      }

      currentPlayerIdx = 1 - currentPlayerIdx
      Board.setIndicator(players[currentPlayerIdx])
    }
    senseLeds.setPixels(Board.state)
  })
})
