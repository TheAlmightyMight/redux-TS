import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { productReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducer";

export const rootReducer = combineReducers({
  productReducer,
  authReducer,
  cartReducer,
});
