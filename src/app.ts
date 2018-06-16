const senseJoystick = require('sense-joystick')
import { Game } from './models'
import { changePlayer, generatePlayers, setPixels } from './utils'

const Board = new Game()
const players = generatePlayers(2)
let currentPlayer = 0

Board.setIndicator(players[currentPlayer].color)
setPixels(Board.state)

senseJoystick.getJoystick().then((joystick: any) => {
  joystick.on('press', (value: string) => {
    if (value === 'click') {
      if (!Board.isValid()) return false

      Board.apply(players[currentPlayer].play())
      currentPlayer = changePlayer(currentPlayer, players)

      if (Board.hasWin()) Board.clear()
      Board.setIndicator(players[currentPlayer].color)
    } else Board.moveIndicator(value)
    setPixels(Board.state)
  })
})
