const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

import { Game, Player } from '~/models'
import { RED_COLOR, GREEN_COLOR } from '~/constants'

const setPixels = (board: any) => {
  senseLeds.setPixels(board)
}

const Board = new Game()
const players = [new Player(RED_COLOR), new Player(GREEN_COLOR)]
let currentPlayerIdx = 0

Board.setIndicator(players[currentPlayerIdx].color)
setPixels(Board.state)

senseJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (value: string) => {
    if (value === 'click') {
      console.log(value)
      if (!Board.isValid()) return false

      Board.apply(players[currentPlayerIdx].play())
      currentPlayerIdx = 1 - currentPlayerIdx

      if (Board.hasWin()) Board.clear()
      Board.setIndicator(players[currentPlayerIdx].color)
    } else Board.moveIndicator(value)
    setPixels(Board.state)
  })
})
