import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import { reducer } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";
import { RootState } from "./reducers/index";

const makeStore = (context: Context) =>
  configureStore({ reducer, middleware: [thunk] });

export const wrapper = createWrapper(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
