const senseLeds = require('sense-hat-led');
import { Player } from './models';

export const AVAILABLE_SPACE: Color = [0, 0, 0];
export const STAGING_SPACE: Color = [25, 25, 25];
export const DOTS_TO_WIN: number = 4;

export const _: Color = AVAILABLE_SPACE;
export const v: Color = STAGING_SPACE;

/* prettier-ignore */
export const BOARD_INITIAL_STATE: Board = [
  v, v, v, v, v, v, v, v,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _
]

export const setPixels = (board: any) => {
  senseLeds.setPixels(board);
};

export const generatePlayers = (number: number): Array<Player> => {
  console.log(number);
  return [new Player([255, 0, 0]), new Player([0, 255, 0])];
};

export const changePlayer = (index: number, players: Array<Player>) => {
  return index + 1 === players.length ? 0 : index + 1;
};

export const hasConnectFour = (array: Array<Color>) => {
  console.log(DOTS_TO_WIN, array);
};
