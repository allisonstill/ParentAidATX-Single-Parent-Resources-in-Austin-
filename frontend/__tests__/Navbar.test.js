import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
jest.mock("../src/components/Navbar.css", () => ({}));
import Navbar from "../src/components/Navbar.jsx";

describe("Navbar", () => {
  test("renders the Navbar with correct links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the expected links are present
    const links = [
      { text: "Books", href: "/books" },
      { text: "Housing", href: "/housing" },
      { text: "Childcare", href: "/childcare" },
      { text: "About", href: "/about" },
    ];

    // Loop through the links and check if they are rendered correctly
    links.forEach(({ text, href }) => {
      const navLink = screen.getByText(text);
      expect(navLink).toBeInTheDocument();
      expect(navLink.closest("a")).toHaveAttribute("href", href);
    });
  });
});
