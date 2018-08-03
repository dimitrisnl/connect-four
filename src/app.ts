const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

import { Game } from './models'
import { RED_COLOR, GREEN_COLOR } from './constants'

const Board = new Game()
const players = [RED_COLOR, GREEN_COLOR]
let currentPlayerIdx = 0

Board.setIndicator(players[currentPlayerIdx])
senseLeds.setPixels(Board.state)

senseJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (value: string) => {
    if (value === 'click' || value === 'down' || value === 'up') {
      if (!Board.isValid()) {
        return
      }

      Board.applyMove()

      if (Board.hasWin()) {
        Board.announceWinner()
        senseLeds.setPixels(Board.state)
        setTimeout(() => {
          Board.clear()
          senseLeds.setPixels(Board.state)
        }, 3000)
      }

      if (Board.isFull()) {
        console.log('is full')
        Board.clear()
      }

      currentPlayerIdx = 1 - currentPlayerIdx
      Board.setIndicator(players[currentPlayerIdx])
    } else {
      Board.moveIndicator(value)
    }
    senseLeds.setPixels(Board.state)
  })
})
