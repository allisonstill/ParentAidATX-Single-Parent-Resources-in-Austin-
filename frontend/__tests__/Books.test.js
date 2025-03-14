import { render, screen, waitFor } from "@testing-library/react"; // Import waitFor for async operations
import Books from "../src/pages/Books.jsx";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
jest.mock("../src/pages/Books.css", () => ({}));
jest.mock("../src/components/bookCard.css", () => ({}));

// Mocking the global fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("Housing Page", () => {
  test("renders the Housing page and displays key information", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    // Wait for the component to be updated and assert that key information is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Books about Single Parenting")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Find many books and resources about single parenting./i
        )
      ).toBeInTheDocument();
    });
  });
});
