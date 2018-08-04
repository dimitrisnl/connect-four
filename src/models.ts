import {
  AVAILABLE_SPACE,
  STAGING_SPACE,
  BOARD_INITIAL_STATE,
  DOTS_TO_WIN,
  RED_COLOR,
  GREEN_COLOR,
} from './constants'

export class Game {
  state: Board
  indicator: Indicator
  players: Array<Color>
  currentPlayerIdx: number

  constructor() {
    this.clear()
    this.players = [RED_COLOR, GREEN_COLOR]
    this.currentPlayerIdx = 0
    this.setIndicator(this.currentPlayer())
  }

  clear = (): void => {
    this.state = [...BOARD_INITIAL_STATE]
    this.indicator = { position: 3, color: STAGING_SPACE }
  }

  isFull = (): boolean => {
    return this.state.find(x => x === AVAILABLE_SPACE) !== undefined
  }

  moveIsValid = (): boolean => {
    // Check if at least the next item horizontically is available
    return this.state[this.indicator.position + 8] === AVAILABLE_SPACE
  }

  /*
    1. Generating an array of [0, 1, 3, 4, 5, 6, 7]
    2. Giving it increments of 8, so that it behaves like column,
       and moving it in the appropriate index where the indicator is.
      E.g. for column 4 (index 3), it will be [4, 12, 20, 28, 36, 44, 52]
    3. Drop the first since it's a staging cell
    4. Keep only the available spaces
    5. Get the last one and fill it
  */
  applyMove = (): void => {
    const position = [...Array(8).keys()]
      .map(x => x * 8 + this.indicator.position)
      .filter(x => x > 7)
      .filter(x => this.state[x] === AVAILABLE_SPACE)
      .pop()
    if (position) this.state[position] = this.indicator.color
  }

  currentPlayer = (): Color => {
    return this.players[this.currentPlayerIdx]
  }

  takeTurns = (): void => {
    this.currentPlayerIdx = 1 - this.currentPlayerIdx
    this.setIndicator(this.currentPlayer())
  }

  setIndicator = (color: Color): void => {
    this.indicator.color = color
    this.state[this.indicator.position] = color
  }

  moveIndicator = (direction: string): void => {
    const { position, color } = this.indicator
    this.state[position] = STAGING_SPACE

    if (direction === 'left') {
      this.indicator.position = position > 0 ? position - 1 : 7
    }

    if (direction === 'right') {
      this.indicator.position = position < 7 ? position + 1 : 0
    }

    this.state[this.indicator.position] = color
  }

  hasWin = (): boolean => {
    const { color } = this.indicator
    const board = this.state.filter((_x, i) => i > 7)

    return (
      // this.hasWonVertically(board, color) ||
      this.hasWonHorizontally(board, color) ||
      // this.hasWonDiagonally(board, color)
    )
  }

  hasWonHorizontally = (board: Board, color: Color): boolean => {
    for (let i = 0; i <= 7; i++) {
      const array = board.filter((_x, idx) => idx % i === 0)
      console.log('hotizontal array:', array)
      if (this.hasXConsecutive(array, color, DOTS_TO_WIN)) return true
    }
    return false
  }

  hasWonVertically = (board: Board, color: Color): boolean => {
    for (let i = 0; i <= 7; i++) {
      const firstIdx = i * 8
      const array = board.filter(
        (_x, idx) => idx >= firstIdx && idx <= firstIdx + 7
      )
      console.log('vertical array:', array)
      if (this.hasXConsecutive(array, color, DOTS_TO_WIN)) return true
    }
    return false
  }

  hasWonDiagonally = (board: Board, color: Color): boolean => {
    for (let i = 0; i <= 7; i++) {
      const array = board.filter((_x, idx) => idx % i === 0)
      if (this.hasXConsecutive(array, color, DOTS_TO_WIN)) return true
    }
    return false
  }

  hasXConsecutive = (array: Board, color: Color, amountNeedeed: number) => {
    let consecutiveDots = 0
    for (let cell of array) {
      consecutiveDots = cell === color ? consecutiveDots + 1 : 0

      if (consecutiveDots === amountNeedeed) {
        return true
      }
      return false
    }
  }
}
