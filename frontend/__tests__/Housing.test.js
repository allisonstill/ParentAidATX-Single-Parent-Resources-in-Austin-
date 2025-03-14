import { render, screen, waitFor } from "@testing-library/react"; // Import waitFor for async operations
import Housing from "../src/pages/Housing.jsx";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
jest.mock("../src/pages/Housing.css", () => ({}));
jest.mock("../src/components/housingCard.css", () => ({}));

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
        <Housing />
      </MemoryRouter>
    );

    // Wait for the component to be updated and assert that key information is displayed
    await waitFor(() => {
      expect(screen.getByText("Housing")).toBeInTheDocument();
      expect(
        screen.getByText(/Find affordable housing in your area/i)
      ).toBeInTheDocument();
    });
  });
});
