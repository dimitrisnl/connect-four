import {
  AVAILABLE_SPACE,
  STAGING_SPACE,
  BOARD_INITIAL_STATE,
} from './constants'

export class Player {
  color: Color
  moves: number
  constructor(color: Color) {
    this.color = color
    this.moves = 0
  }
  play = () => {
    this.moves++
    return this.color
  }
}

export class Game {
  state: Board
  indicator: Indicator
  indicatorFlicker: any
  constructor() {
    this.state = BOARD_INITIAL_STATE
    this.indicator = { position: 3, color: STAGING_SPACE }
  }
  clear = (): void => {
    this.state = BOARD_INITIAL_STATE
  }
  apply = (color: Color): void => {
    const position = [...Array(8).keys()]
      .map(x => x * 8 + this.indicator.position)
      .filter(x => x > 7)
      .filter(x => this.state[x] === AVAILABLE_SPACE)
      .pop()
    if (position) this.state[position] = color
  }
  isValid = (): boolean => {
    return this.state[this.indicator.position + 8] === AVAILABLE_SPACE
  }
  clearIndicator = (): void => {
    this.state[this.indicator.position] = STAGING_SPACE
  }
  setIndicator = (color: Color): void => {
    this.state[this.indicator.position] = AVAILABLE_SPACE
    this.indicatorFlicker = setTimeout(() => {
      this.indicator.color = color
      this.setIndicator(color)
    }, 3000)
  }
  moveIndicator = (direction: string): void => {
    const { position } = this.indicator
    this.clearIndicator()
    switch (direction) {
      case 'left':
        if (position > 0) this.indicator.position--
        else this.indicator.position = 7
        break
      case 'right':
        if (position < 7) this.indicator.position++
        else this.indicator.position = 0
        break
      case 'up':
      case 'down':
        break
      default:
        this.indicator.position = 0
    }
    this.state[this.indicator.position] = this.indicator.color
  }
  hasWin = (): boolean => {
    if (this.hasWonVertically()) return false
    if (this.hasWonHorizontally()) return false
    if (this.hasWonDiagonally()) return false

    return false
  }
  hasWonVertically = (): boolean => {
    return false
  }
  hasWonHorizontally = (): boolean => {
    return false
  }
  hasWonDiagonally = (): boolean => {
    return false
  }
}
