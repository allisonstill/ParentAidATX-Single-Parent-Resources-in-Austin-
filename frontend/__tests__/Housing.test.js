import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Housing from "../src/pages/Housing.jsx";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock CSS to prevent errors
jest.mock("../src/pages/Housing.css", () => ({}));
jest.mock("../src/components/housingCard.css", () => ({}));
jest.mock("../src/pages/Search.css", () => ({}));

jest.mock("../src/utils/getDrivingDistance", () => ({
  getDrivingDistance: jest.fn(() => Promise.resolve(5)), // fake value in miles
}));

// ✅ Mock HousingCard component
jest.mock("../src/components/housingCard.jsx", () => (props) => {
  return (
    <div data-testid="housing-card">
      <h3>{props.name}</h3>
      <p>{props.address}</p>
      <p>{props.rating}</p>
      <p>{props.totalRatings}</p>
    </div>
  );
});

// ✅ Mock fetch with housing data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Sunset Apartments",
            address: "123 Main St, Austin, TX 78701",
            rating: 4.5,
            totalRatings: 120,
          },
          {
            id: 2,
            name: "Hilltop Housing",
            address: "456 Elm St, Austin, TX 78702",
            rating: 3.9,
            totalRatings: 80,
          },
          {
            id: 3,
            name: "Greenway Homes",
            address: "789 Oak St, Austin, TX 78703",
            rating: 2.5,
            totalRatings: 20,
          },
        ]),
    })
  );
});

// Cleanup
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Housing Page", () => {
  test("renders and filters by search and zip code", async () => {
    render(
      <MemoryRouter>
        <Housing />
      </MemoryRouter>
    );

    // ✅ Wait for cards to appear
    await waitFor(() => {
      expect(screen.getAllByTestId("housing-card").length).toBe(3);
    });

    // ✅ Test searching for "Sunset"
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Sunset" } });

    await waitFor(() => {
      const cards = screen.getAllByTestId("housing-card");
      expect(cards.length).toBe(1);
      expect(screen.getByText("Sunset Apartments")).toBeInTheDocument();
    });

    // ✅ Clear search
    fireEvent.change(searchInput, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getAllByTestId("housing-card").length).toBe(3);
    });

    // ✅ Open filter dropdown
    const filterButton = screen.getByText((content, element) => {
      return element?.tagName === "BUTTON" && content.includes("Filter By");
    });
    fireEvent.click(filterButton);

    // ✅ Filter by Zip Code (78702)
    const zipSelect = screen.getByLabelText("Zip Code");
    fireEvent.change(zipSelect, { target: { value: "78702" } });

    await waitFor(() => {
      const cards = screen.getAllByTestId("housing-card");
      expect(cards.length).toBe(1);
      expect(screen.getByText("Hilltop Housing")).toBeInTheDocument();
    });
  });
});
