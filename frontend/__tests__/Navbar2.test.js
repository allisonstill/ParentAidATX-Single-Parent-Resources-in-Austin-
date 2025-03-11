import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/Navbar.jsx";
import { MemoryRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
jest.mock("../src/components/Navbar.css", () => ({}));

// ✅ Mock `useLocation` from `react-router-dom`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("NavBar", () => {
  beforeEach(() => {
    // ✅ Mock `useLocation` to return the desired pathname
    useLocation.mockReturnValue({ pathname: "/books" });
  });

  test("marks the correct link as active based on the current route", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the 'About' link has the active class
    const aboutLink = screen.getByText("Books");
    expect(aboutLink).toHaveClass("active");

    // Other links should not have the nav-item class
    const newsLink = screen.getByText("Housing");
    expect(newsLink).not.toHaveClass("active");

    const groupsLink = screen.getByText("Childcare");
    expect(groupsLink).not.toHaveClass("active");

    const countriesLink = screen.getByText("About");
    expect(countriesLink).not.toHaveClass("active");
  });
});
