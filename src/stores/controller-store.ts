import { writable } from 'svelte/store'

export type GamepadType = 'xbox' | 'ps4' | 'switch'

/**
 * Left Stick Horizontal: axes[0]
 * Left Stick Vertical: axes[1]
 * Right Stick Horizontal: axes[2]
 * Right Stick Vertical: axes[3]
 */
interface AxesState {
  LeftStickHorizontal: number
  LeftStickVertical: number
  RightStickHorizontal: number
  RightStickVertical: number
}

/**
 * Aボタン: buttons[0]
 * Bボタン: buttons[1]
 * Xボタン: buttons[2]
 * Yボタン: buttons[3]
 * LB (Left Bumper): buttons[4]
 * RB (Right Bumper): buttons[5]
 * LT (Left Trigger): buttons[6]
 * RT (Right Trigger): buttons[7]
 * Back/View: buttons[8]
 * Start/Menu: buttons[9]
 * Left Stick Press: buttons[10]
 * Right Stick Press: buttons[11]
 * D-pad Up: buttons[12]
 * D-pad Down: buttons[13]
 * D-pad Left: buttons[14]
 * D-pad Right: buttons[15]
 * Xbox Button: buttons[16]
 */
export interface ButtonState {
  A: boolean
  B: boolean
  X: boolean
  Y: boolean
  LB: boolean
  RB: boolean
  LT: boolean
  RT: boolean
  Back: boolean
  Start: boolean
  LeftStickPress: boolean
  RightStickPress: boolean
  DpadUp: boolean
  DpadDown: boolean
  DpadLeft: boolean
  DpadRight: boolean
  XboxButton: boolean
  PsButton: boolean
  PsTouchpad: boolean
  PsShare: boolean
  PsOptions: boolean
}

export interface ControllerState {
  axis: AxesState
  button: ButtonState
}

export const initState: ControllerState = {
  axis: {
    LeftStickHorizontal: 0,
    LeftStickVertical: 0,
    RightStickHorizontal: 0,
    RightStickVertical: 0
  },
  button: {
    A: false,
    B: false,
    X: false,
    Y: false,
    LB: false,
    RB: false,
    LT: false,
    RT: false,
    Back: false,
    Start: false,
    LeftStickPress: false,
    RightStickPress: false,
    DpadUp: false,
    DpadDown: false,
    DpadLeft: false,
    DpadRight: false,
    XboxButton: false,
    PsButton: false,
    PsTouchpad: false,
    PsShare: false,
    PsOptions: false
  }
}

export const controllerStore = writable<ControllerState>(initState)

export function setStateByGamePad(type: GamepadType, gamepad: Gamepad) {
  let state: ControllerState
  switch (type) {
    case 'xbox':
      state = getXboxInput(gamepad)
      return
    case 'ps4':
      state = getPS4Input(gamepad)
      return
    default:
      state = initState
  }
  controllerStore.set(state)
}

function getXboxInput(gamepad: Gamepad): ControllerState {
  return {
    axis: {
      LeftStickHorizontal: gamepad.axes[0],
      LeftStickVertical: gamepad.axes[1],
      RightStickHorizontal: gamepad.axes[2],
      RightStickVertical: gamepad.axes[3]
    },
    button: {
      ...initState.button,
      A: gamepad.buttons[0]?.pressed,
      B: gamepad.buttons[1]?.pressed,
      X: gamepad.buttons[2]?.pressed,
      Y: gamepad.buttons[3]?.pressed,
      LB: gamepad.buttons[4]?.pressed,
      RB: gamepad.buttons[5]?.pressed,
      LT: gamepad.buttons[6]?.pressed,
      RT: gamepad.buttons[7]?.pressed,
      Back: gamepad.buttons[8]?.pressed,
      Start: gamepad.buttons[9]?.pressed,
      LeftStickPress: gamepad.buttons[10]?.pressed,
      RightStickPress: gamepad.buttons[11]?.pressed,
      DpadUp: gamepad.buttons[12]?.pressed,
      DpadDown: gamepad.buttons[13]?.pressed,
      DpadLeft: gamepad.buttons[14]?.pressed,
      DpadRight: gamepad.buttons[15]?.pressed,
      XboxButton: gamepad.buttons[16]?.pressed
    }
  }
}

function getPS4Input(gamepad: Gamepad): ControllerState {
  return {
    axis: {
      LeftStickHorizontal: gamepad.axes[0],
      LeftStickVertical: gamepad.axes[1],
      RightStickHorizontal: gamepad.axes[2],
      RightStickVertical: gamepad.axes[3]
    },
    button: {
      ...initState.button,
      X: gamepad.buttons[0]?.pressed, // □ (Square)
      A: gamepad.buttons[1]?.pressed, // × (Cross)
      B: gamepad.buttons[2]?.pressed, // ○ (Circle)
      Y: gamepad.buttons[3]?.pressed, // △ (Triangle)
      LB: gamepad.buttons[4]?.pressed, // L1 (Left Bumper)
      RB: gamepad.buttons[5]?.pressed, // R1 (Right Bumper)
      LT: gamepad.buttons[6]?.pressed, // L2 (Left Trigger)
      RT: gamepad.buttons[7]?.pressed, // R2 (Right Trigger)
      PsShare: gamepad.buttons[8]?.pressed, // Share
      PsOptions: gamepad.buttons[9]?.pressed, // Options
      LeftStickPress: gamepad.buttons[10]?.pressed, // Left Stick Press
      RightStickPress: gamepad.buttons[11]?.pressed, // Right Stick Press
      PsButton: gamepad.buttons[12]?.pressed, // PS Button (PlayStation button in the center)
      PsTouchpad: gamepad.buttons[13]?.pressed // Touchpad Press
    }
  }
}
