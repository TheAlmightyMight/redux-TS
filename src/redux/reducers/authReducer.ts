import { ActionTypes, AuthAction } from "../actionCreators/AuthActions";

type InitialState = {
  isLogged: boolean;
  isAdmin: boolean;
  error: boolean;
};

const initialState = {
  isLogged: false,
  isAdmin: false,
  error: false,
};

export const authReducer = (
  state: InitialState = initialState,
  action: AuthAction
): typeof initialState => {
  switch (action.type) {
    case ActionTypes.ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.LOGIN: {
      return {
        ...state,
        isLogged: true,
        isAdmin: action.payload,
      };
    }
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};
