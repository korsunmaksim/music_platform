import { EPlayerActionTypes, PlayerAction } from "@/common/types/player.types";
import { ITrack } from "@/common/types/track.types";

export const playTrack = (): PlayerAction => {
  return { type: EPlayerActionTypes.PLAY };
};
export const pauseTrack = (): PlayerAction => {
  return { type: EPlayerActionTypes.PAUSE };
};
export const setDuration = (payload: number): PlayerAction => {
  return { type: EPlayerActionTypes.SET_DURATION, payload };
};
export const setVolume = (payload: number): PlayerAction => {
  return { type: EPlayerActionTypes.SET_VOLUME, payload };
};
export const setCurrentTime = (payload: number): PlayerAction => {
  return { type: EPlayerActionTypes.SET_CURRENT_TIME, payload };
};
export const setActiveTrack = (payload: ITrack): PlayerAction => {
  return { type: EPlayerActionTypes.SET_ACTIVE, payload };
};
