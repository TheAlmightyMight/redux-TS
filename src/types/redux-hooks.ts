import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { AnyAction } from "redux";
import { SpecificActions } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";

export type AppDispatch = ThunkDispatch<RootState, any, SpecificActions>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
