import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./rootReducer";

function configureStore() {
  const store = createStore(
    rootReducer,
    // preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  return store;
}

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
type AppDispatchType = typeof store.dispatch;
export type SpecificActions = ReturnType<AppDispatchType>;
