import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./rootReducer";

export function configureStore(
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  return store;
}

export const store = configureStore({
  authReducer: {
    isLogged: true,
    isAdmin: false,
    error: false,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatchType = typeof store.dispatch;
export type SpecificActions = ReturnType<AppDispatchType>;
