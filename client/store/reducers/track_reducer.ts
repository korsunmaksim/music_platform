import {
  ETrackActionTypes,
  ITrackState,
  TrackAction,
} from "@/common/types/track.types";

const initialState: ITrackState = {
  tracks: [],
  error: "",
};

export const trackReducer = (
  state = initialState,
  action: TrackAction
): ITrackState => {
  switch (action.type) {
    case ETrackActionTypes.FETCH_TRACKS:
      return { error: "", tracks: action.payload };
    case ETrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
