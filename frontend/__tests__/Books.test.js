import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Books from "../src/pages/Books.jsx";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock CSS
jest.mock("../src/pages/Books.css", () => ({}));
jest.mock("../src/pages/Search.css", () => ({}));
jest.mock("../src/components/bookCard.css", () => ({}));
jest.mock("../src/components/Pagination.css", () => ({}));

// Mock BookCard
jest.mock("../src/components/bookCard.jsx", () => (props) => {
  return (
    <div data-testid="book-card">
      <h3>{props.title}</h3>
      <p>{props.author}</p>
      <p>{props.cat}</p>
    </div>
  );
});

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Single Parent Guide",
            author: "Jane Doe",
            cat: "Parenting",
            publishDate: "2022",
          },
          {
            id: 2,
            title: "Financial Help",
            author: "John Smith",
            cat: "Finance",
            publishDate: "2021",
          },
          {
            id: 3,
            title: "Healthy Parenting",
            author: "Emily Johnson",
            cat: "Parenting",
            publishDate: "2020",
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Books Page", () => {
  test("renders books and filters by search and category", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    // Wait for book cards to render
    await waitFor(() => {
      expect(screen.getAllByTestId("book-card").length).toBe(3);
    });

    // Simulate search
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Healthy" } });

    // Wait for filtered result
    await waitFor(() => {
      expect(screen.getAllByTestId("book-card").length).toBe(1);
      expect(screen.getByText("Healthy Parenting")).toBeInTheDocument();
    });

    // Reset search
    fireEvent.change(searchInput, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getAllByTestId("book-card").length).toBe(3);
    });

    // Simulate filter dropdown click
    const filterButton = screen.getByText((content, element) => {
      return element?.tagName === "BUTTON";
    });
    fireEvent.click(filterButton);

    // Select category filter
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: "Finance" } });

    // Wait for filtered result
    await waitFor(() => {
      const cards = screen.getAllByTestId("book-card");
      expect(cards.length).toBe(1);
      expect(screen.getByText("Financial Help")).toBeInTheDocument();
    });
  });
});
