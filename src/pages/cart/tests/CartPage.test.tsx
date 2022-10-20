import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Cart from ".././Cart";
import TableRow from "../TableRow";

import { Provider } from "react-redux";
import { store } from "../../../redux/store";

//types
import { CartItem } from "../../../types/CartItem";

describe("Cart Page", () => {
  test.skip("Renders an empty list after pressing delete all button", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    const element = screen.getByText("Удалить все");
    userEvent.click(element);
    const list = screen.queryAllByRole("listitem");
    console.log(list);
    expect(list.length).toBe(0);
  });

  //   test("Increments cart item's quantity", () => {
  //     const props: CartItem = {
  //       id: "id_12345",
  //       title: "title",
  //       price: 42,
  //       picture: "picture url",
  //       description: "description",
  //       stock: 2,
  //       quantity: 1,
  //     };

  //     render(
  //       <Provider store={store}>
  //         <TableRow {...props} />
  //       </Provider>
  //     );
  //     const elementIncrementer = screen.getByText("+");
  //     const quantityElement = screen.getByTestId("quantity");

  //     fireEvent.click(elementIncrementer);
  //     expect(quantityElement.textContent).toMatch("2");
  //   });
});
