import {
  EPlayerActionTypes,
  IPlayerState,
  PlayerAction,
} from "@/common/types/player.types";

const initialState: IPlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): IPlayerState => {
  switch (action.type) {
    case EPlayerActionTypes.PAUSE:
      return { ...state, pause: true };
    case EPlayerActionTypes.PLAY:
      return { ...state, pause: false };
    case EPlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case EPlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case EPlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case EPlayerActionTypes.SET_ACTIVE:
      return { ...state, active: action.payload, duration: 0, currentTime: 0 };
    default:
      return state;
  }
};
