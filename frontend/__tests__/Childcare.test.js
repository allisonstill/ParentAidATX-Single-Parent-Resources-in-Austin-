import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Childcare from "../src/pages/Childcare.jsx";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock CSS to avoid errors during import
jest.mock("../src/pages/Childcare.css", () => ({}));
jest.mock("../src/pages/Search.css", () => ({}));
jest.mock("../src/components/childCard.css", () => ({}));
jest.mock("../src/components/Pagination.css", () => ({}));

// Mock ChildCard component for simplified rendering
jest.mock("../src/components/childCard.jsx", () => (props) => {
  return (
    <div data-testid="childcard">
      <h3>{props.name}</h3>
      <p>{props.type}</p>
    </div>
  );
});

// Mock fetch before each test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Bright Future Daycare",
            program_type: "Montessori",
            age_range: "2 yrs - 5 yrs",
            open_time: "7:00am",
            close_time: "6:00pm",
            address: "123 Main St Austin, TX",
          },
          {
            id: 2,
            name: "Happy Tots Learning Center",
            program_type: "Play Based",
            age_range: "1 yr - 3 yrs",
            open_time: "8:00am",
            close_time: "5:30pm",
            address: "456 Elm St Austin, TX",
          },
          {
            id: 3,
            name: "Childcare Plus",
            program_type: "Language Immersion",
            age_range: "3 yrs - 6 yrs",
            open_time: "6:30am",
            close_time: "6:00pm",
            address: "789 Oak St Round Rock, TX",
          },
        ]),
    })
  );
});

// Cleanup
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Childcare Page", () => {
  test("renders daycare cards and filters by search", async () => {
    render(
      <MemoryRouter>
        <Childcare />
      </MemoryRouter>
    );

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getAllByTestId("childcard").length).toBe(3);
    });

    // Type in search box
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Happy Tots" } });

    // Wait for filtered result
    await waitFor(() => {
      const filteredCards = screen.getAllByTestId("childcard");
      expect(filteredCards.length).toBe(1);
      expect(
        screen.getByText("Happy Tots Learning Center")
      ).toBeInTheDocument();
    });

    // Clear search
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getAllByTestId("childcard").length).toBe(3);
    });
  });
});
