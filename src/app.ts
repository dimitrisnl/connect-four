const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

import { Game, Player } from './models'
import { RED_COLOR, GREEN_COLOR } from './constants'

const Board = new Game()
const players = [new Player(RED_COLOR), new Player(GREEN_COLOR)]
let currentPlayerIdx = 0

Board.setIndicator(players[currentPlayerIdx].color)
senseLeds.setPixels(Board.state)

senseJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (value: string) => {
    console.log(value)
    if (value === 'click') {
      if (!Board.isValid()) return false

      Board.apply(players[currentPlayerIdx].play())
      currentPlayerIdx = 1 - currentPlayerIdx

      if (Board.hasWin()) Board.clear()
      Board.setIndicator(players[currentPlayerIdx].color)
    } else Board.moveIndicator(value)
    senseLeds.setPixels(Board.state)
  })
})
