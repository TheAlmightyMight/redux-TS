import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//auth action creators
import { login, logout } from "../../../redux/actionCreators/AuthActions";

//components
import CommonLayout from "../CommonLayout";

//router
import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    authReducer: {
      isLogged: false,
      isAdmin: false,
      error: false,
    },
  });
});

describe("Auth Icon", () => {
  test("Gets displayed if not logged", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });
  test("Gets replaced by exit sign", async () => {
    store.dispatch(login(false));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );
    //@ts-ignore
    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });
  test("Gets replaced by exit", async () => {
    store.dispatch(login(true));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommonLayout />
        </BrowserRouter>
      </Provider>
    );
    const state = store.getState();
    console.log(state);
    //@ts-ignore
    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });
});
