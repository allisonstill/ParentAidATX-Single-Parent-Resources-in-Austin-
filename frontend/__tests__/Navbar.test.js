import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar", () => {
  test("renders the Navbar with correct links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the brand logo is present
    expect(screen.getByAltText("ParentAidATX Logo")).toBeInTheDocument();

    // Check if the expected links are present
    const links = [
      { text: "Government Programs", href: "/programs" },
      { text: "Housing", href: "/housing" },
      { text: "Childcare", href: "/childcare" },
      { text: "About", href: "/about" },
    ];

    links.forEach(({ text, href }) => {
      const navLink = screen.getByText(text);
      expect(navLink).toBeInTheDocument();
      expect(navLink.closest("a")).toHaveAttribute("href", href);
    });
  });
});
