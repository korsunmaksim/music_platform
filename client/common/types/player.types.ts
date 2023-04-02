import { ITrack } from "./track.types";

export interface IPlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum EPlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
  type: EPlayerActionTypes.PLAY;
}
interface PauseAction {
  type: EPlayerActionTypes.PAUSE;
}
interface SetActiveAction {
  type: EPlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}
interface SetDurationAction {
  type: EPlayerActionTypes.SET_DURATION;
  payload: number;
}
interface SetVolumeAction {
  type: EPlayerActionTypes.SET_VOLUME;
  payload: number;
}
interface SetCurrentTimeAction {
  type: EPlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

export type PlayerAction =
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetVolumeAction
  | SetCurrentTimeAction;
