import { render, screen, waitFor } from "@testing-library/react";
import Books from "../src/pages/Books.jsx";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock CSS imports to prevent Jest errors
jest.mock("../src/pages/Books.css", () => ({}));
jest.mock("../src/components/bookCard.css", () => ({}));

// Mock the BookCard component to check its rendering
jest.mock("../src/components/bookCard", () => (props) => {
  return (
    <div data-testid="book-card">
      <h3>{props.title}</h3>
      <p>{props.author}</p>
      <p>{props.publishDate}</p>
      <p>{props.pageCount}</p>
      <p>{props.listPrice}</p>
      <p>{props.cat}</p>
    </div>
  );
});

// Mock Fetch API
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
            publishDate: "2022",
            pageCount: 250,
            listPrice: "$20.00",
            cat: "Parenting",
          },
          {
            id: 2,
            title: "Raising Kids Alone",
            author: "John Smith",
            publishDate: "2021",
            pageCount: 320,
            listPrice: "$25.00",
            cat: "Single Parenting",
          },
          {
            id: 3,
            title: "Parenting with Love",
            author: "Emily Johnson",
            publishDate: "2020",
            pageCount: 200,
            listPrice: "$18.00",
            cat: "Parenting",
          },
        ]),
    })
  );
});

// Cleanup fetch mock after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Books Page", () => {
  test("renders the BookCard component correctly with book details", async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    );

    // Wait for BookCards to load
    const bookCards = await screen.findAllByTestId("book-card");
    expect(bookCards.length).toBe(3); // Ensure the correct number of books are rendered

    // Verify BookCard content for each book
    const firstBookCard = bookCards[0];
    expect(firstBookCard).toHaveTextContent("Single Parent Guide");
    expect(firstBookCard).toHaveTextContent("Jane Doe");
    expect(firstBookCard).toHaveTextContent("2022");
    expect(firstBookCard).toHaveTextContent("250");
    expect(firstBookCard).toHaveTextContent("$20.00");
    expect(firstBookCard).toHaveTextContent("Parenting");

    const secondBookCard = bookCards[1];
    expect(secondBookCard).toHaveTextContent("Raising Kids Alone");
    expect(secondBookCard).toHaveTextContent("John Smith");
    expect(secondBookCard).toHaveTextContent("2021");
    expect(secondBookCard).toHaveTextContent("320");
    expect(secondBookCard).toHaveTextContent("$25.00");
    expect(secondBookCard).toHaveTextContent("Single Parenting");

    const thirdBookCard = bookCards[2];
    expect(thirdBookCard).toHaveTextContent("Parenting with Love");
    expect(thirdBookCard).toHaveTextContent("Emily Johnson");
    expect(thirdBookCard).toHaveTextContent("2020");
    expect(thirdBookCard).toHaveTextContent("200");
    expect(thirdBookCard).toHaveTextContent("$18.00");
    expect(thirdBookCard).toHaveTextContent("Parenting");
  });
});
