import { render, screen, waitFor } from "@testing-library/react"; // Import waitFor for async operations
import About from "../src/pages/About.jsx";
import "@testing-library/jest-dom";
jest.mock("../src/pages/About.css", () => ({}));
jest.mock("../src/components/AboutCard.css", () => ({}));

// Mocking the global fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("About Page", () => {
  test("renders the About page and displays key information", async () => {
    render(<About />); // Render the About component

    // Wait for the component to be updated and assert that key information is displayed
    await waitFor(() => {
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(
        screen.getByText(/Support for Single Parents in Austin, Simplified./i)
      ).toBeInTheDocument();
      expect(screen.getByText("Meet The Team")).toBeInTheDocument();
      expect(screen.getByText("Amna Ali")).toBeInTheDocument();
      expect(screen.getByText("Andrew Harvey")).toBeInTheDocument();
      expect(screen.getByText("Rubi Rojas")).toBeInTheDocument();
      expect(screen.getByText("Allison Still")).toBeInTheDocument();
      expect(screen.getByText("Ethan Yu")).toBeInTheDocument();
    });
  });
});
