import { render, screen, waitFor } from "@testing-library/react"; // Import waitFor for async operations
import Childcare from "../src/pages/Childcare.jsx";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
jest.mock("../src/pages/Childcare.css", () => ({}));
jest.mock("../src/components/childCard.css", () => ({}));

// Mocking the global fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("Childcare Page", () => {
  test("renders the Childcare page and displays key information", async () => {
    render(
      <MemoryRouter>
        <Childcare />
      </MemoryRouter>
    );

    // Wait for the component to be updated and assert that key information is displayed
    await waitFor(() => {
      expect(screen.getByText("Childcare Services")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Find affordable childcare services in the Austin area/i
        )
      ).toBeInTheDocument();
    });
  });
});
