import { AnyAction, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { playerReducer } from "./player_reducer";
import { trackReducer } from "./track_reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
});

export const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export interface State {
  tick: string;
}

export type RootState = ReturnType<typeof rootReducer>;
