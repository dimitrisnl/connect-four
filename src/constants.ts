export const RED_COLOR: Color = [255, 0, 0]
export const GREEN_COLOR: Color = [0, 255, 0]

export const AVAILABLE_SPACE: Color = [0, 0, 0]
export const STAGING_SPACE: Color = [40, 40, 40]

export const _: Color = AVAILABLE_SPACE
export const v: Color = STAGING_SPACE

export const DOTS_TO_WIN: number = 4

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

export const hasConnectFour = (array: Array<Color>) => {
  console.log(DOTS_TO_WIN, array)
}
