import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { SpecificActions } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";

type AppDispatch = ThunkDispatch<RootState, any, SpecificActions>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
