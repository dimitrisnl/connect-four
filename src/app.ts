const senseJoystick = require('sense-joystick')
import { Game, Player } from './models'
import { RED_COLOR, GREEN_COLOR, setPixels } from './utils'

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
