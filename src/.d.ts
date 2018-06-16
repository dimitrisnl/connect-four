declare module 'sense-hat-led'
declare module 'sense-joystick'

type Color = [number, number, number]
type Board = Array<Color>
type Indicator = { position: number; color: Color }
