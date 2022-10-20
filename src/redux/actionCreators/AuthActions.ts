import { Dispatch } from "redux";

type AuthAction =
  | ReturnType<typeof authError>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>;

type Options<T extends Request> = {
  [P in keyof T]: P extends "body" ? string : T[P];
};

type RequestOptions = Partial<Options<Request>>;

enum AuthActionTypes {
  "ERROR" = "ERROR",
  "LOGIN" = "LOGIN",
  "LOGOUT" = "LOGOUT",
}

interface ErrorAction {
  type: AuthActionTypes.ERROR;
  payload: boolean;
}

function authError(flag: boolean): ErrorAction {
  return {
    type: AuthActionTypes.ERROR,
    payload: flag,
  };
}

interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: boolean;
}

function login(flag: boolean): LoginAction {
  return {
    type: AuthActionTypes.LOGIN,
    payload: flag,
  };
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

function logout(): LogoutAction {
  return {
    type: AuthActionTypes.LOGOUT,
  };
}

const loginAsync =
  (credentials: { login: string; password: string }) =>
  (dispatch: Dispatch<AuthAction>) => {
    const headers = new Headers();
    headers.append("Authorization", "true");
    headers.append("Content-Type", "application/json");

    const options: RequestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(credentials),
    };

    fetch("https://panicky-swimsuit-tuna.cyclic.app/auth", options)
      .then((req) => {
        return req.text();
      })
      .then((res) => {
        console.log(res);
        if (res === "admin") {
          dispatch(login(true));
        } else if (res === "user") {
          dispatch(login(false));
        } else {
          dispatch(authError(true));
        }
      })
      .catch((err) => {
        dispatch(authError(true));
        console.error(err);
      });
  };

export { logout, login, loginAsync, authError, AuthActionTypes };
export type { AuthAction };
