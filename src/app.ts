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
    if (value === 'click' || value === 'down' || value === 'up') {
      if (!Board.isValid() || declaringWinner) {
        return
      }

      Board.applyMove()

      if (Board.hasWin()) {
        declaringWinner = true
        senseLeds.showMessage('Winner', Board.indicator.color, () => {
          declaringWinner = false
          Board.clear()
          Board.setIndicator(players[currentPlayerIdx])
          senseLeds.setPixels(Board.state)
        })
      } else if (Board.isFull()) {
        Board.clear()
      }

      currentPlayerIdx = 1 - currentPlayerIdx
      Board.setIndicator(players[currentPlayerIdx])
    } else {
      Board.moveIndicator(value)
    }
    if (!declaringWinner) {
      senseLeds.setPixels(Board.state)
    }
  })
})
