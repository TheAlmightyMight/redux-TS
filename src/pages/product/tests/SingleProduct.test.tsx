import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

//components
import SingleProducts from "../SingleProducts";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

let store: ReturnType<typeof configureStore>;

beforeAll(() => {
  store = configureStore({
    authReducer: {
      isLogged: true,
      isAdmin: true,
      error: false,
    },
  });
});

describe("", () => {
  test("Renders", () => {});
});
