import { combineReducers } from "redux";
import { authReducer } from "../redux/reducers/authReducer";
import { productReducer } from "../redux/reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducer";

export const rootReducer = combineReducers({
  productReducer,
  authReducer,
  cartReducer,
});
