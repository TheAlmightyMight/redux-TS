import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

//components
import ErrorPage from "../ErrorPage";

describe("Error Page", () => {
  test("Renders without crashing", async () => {
    render(<ErrorPage />);

    expect(
      await screen.findByText(
        "Что-то пошло не так. Данной страницы не существует"
      )
    ).toBeInTheDocument();
  });
});
