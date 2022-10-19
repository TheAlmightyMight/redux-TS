import { AuthActionTypes, AuthAction } from "../actionCreators/AuthActions";

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
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        isLogged: true,
        isAdmin: action.payload,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isLogged: false,
        isAdmin: false,
      };
    }
    case AuthActionTypes.ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
