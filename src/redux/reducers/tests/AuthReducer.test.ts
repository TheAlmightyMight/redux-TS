//reducer
import { authReducer } from "../authReducer";

//actions
import {
  login,
  logout,
  authError,
} from "../../../redux/actionCreators/AuthActions";

let state: {
  isLogged: boolean;
  isAdmin: boolean;
  error: boolean;
};

beforeEach(() => {
  state = {
    isLogged: false,
    isAdmin: false,
    error: false,
  };
});

describe("Auth Reducer", () => {
  test("Logs in as a user", () => {
    expect(authReducer(state, login(false)).isLogged).toBeTruthy();
  });

  test("Logs in as an admin", () => {
    expect(authReducer(state, login(true)).isAdmin).toBeTruthy();
  });

  test("Log out", () => {
    expect(authReducer(state, logout()).isLogged).toBeFalsy();
    expect(authReducer(state, logout()).isAdmin).toBeFalsy();
  });

  test("Sets error", () => {
    expect(authReducer(state, authError(true)).error).toBeTruthy();
    expect(authReducer(state, authError(false)).error).toBeFalsy();
  });
});
