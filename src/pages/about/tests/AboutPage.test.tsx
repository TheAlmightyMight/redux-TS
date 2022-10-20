import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import About from "../About";

const content = "This is my shop's about page, welcome!";
const reg = new RegExp(`${content}`, "i");

test("Renders without crashing", () => {
  render(<About />);
  const paragraph = screen.getByText(reg);
  expect(paragraph).toBeInTheDocument();
});
