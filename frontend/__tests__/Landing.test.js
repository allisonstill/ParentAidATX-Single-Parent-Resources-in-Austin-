import { render, screen, waitFor } from "@testing-library/react"; // Import waitFor for async operations
import Home from "../src/pages/Home.jsx";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
jest.mock("../src/pages/Home.css", () => ({}));

// Mocking the global fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("Home Page", () => {
  test("renders the Home page and displays key information", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for the component to be updated and assert that key information is displayed
    await waitFor(() => {
      expect(screen.getByText("ParentAidATX")).toBeInTheDocument();
      expect(
        screen.getByText(/Your Partner in Parenting./i)
      ).toBeInTheDocument();
    });
  });
});
