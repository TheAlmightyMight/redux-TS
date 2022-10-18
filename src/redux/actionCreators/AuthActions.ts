import { Dispatch } from "react";

type AuthAction =
  | ReturnType<typeof authError>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>;

type Options<T extends Request> = {
  [P in keyof T]: P extends "body" ? string : T[P];
};

type RequestOptions = Partial<Options<Request>>;

enum ActionTypes {
  "ERROR",
  "LOGIN",
  "LOGOUT",
}

interface ErrorAction {
  type: ActionTypes.ERROR;
  payload: boolean;
}

function authError(flag: boolean): ErrorAction {
  return {
    type: ActionTypes.ERROR,
    payload: flag,
  };
}

interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: boolean;
}

function login(flag: boolean): LoginAction {
  return {
    type: ActionTypes.LOGIN,
    payload: flag,
  };
}

interface LogoutAction {
  type: ActionTypes.LOGOUT;
}

function logout(): LogoutAction {
  return {
    type: ActionTypes.LOGOUT,
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

    fetch("https://dirndl-fish.cyclic.app/auth", options)
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

export { logout, login, loginAsync, authError, ActionTypes };
export type { AuthAction };
