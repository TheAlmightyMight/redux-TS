import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

//actions
import { login, logout } from "../../../redux/actionCreators/AuthActions";
import { addCartItem } from "../../../redux/actionCreators/CartActions";

import { BrowserRouter } from "react-router-dom";

//store
import { Provider } from "react-redux";
import { configureStore } from "../../../redux/store";

//components
import AdminProduct from "../AdminProduct";

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({
    authReducer: {
      isLogged: false,
      isAdmin: false,
      error: false,
    },
    cartReducer: {
      items: [],
      loading: false,
      error: false,
    },
  });
});

describe("Admin Product Page", () => {
  const product = {
    id: "id",
    description: "cool laptop very cooool!",
    stock: 2,
    picture: "https://dummyimage.com/500x500/000/fff.png",
    title: "laptop",
    price: 442,
  };
  test("Renders inputs as intended", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AdminProduct {...product} />
        </Provider>
      </BrowserRouter>
    );
    const arr = screen.getAllByTestId("input");
    console.log(arr);
    await arr.forEach(async (el) => {
      await userEvent.type(el, "Lorem Ipsum");
    });

    arr.forEach((el) => {
      expect(el).toHaveValue("Lorem Ipsum");
    });
  });
});
