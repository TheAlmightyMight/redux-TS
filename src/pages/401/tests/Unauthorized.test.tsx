import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Unauthorized from "../Unauthorized";

describe("Error Page", () => {
  test("Renders without crashing", async () => {
    render(<Unauthorized />);

    expect(
      await screen.findByText(
        "Похоже у вас не достаточно прав, чтобы здесь находится."
      )
    ).toBeInTheDocument();
  });
});
