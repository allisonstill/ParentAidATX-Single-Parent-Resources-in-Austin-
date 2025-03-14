import { render, screen } from "@testing-library/react";
import About from "../src/pages/About.jsx";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock CSS imports to prevent Jest errors
jest.mock("../src/pages/About.css", () => ({}));
jest.mock("../src/components/AboutCard.css", () => ({}));

// Mock the AboutCard component to check its rendering
jest.mock("../src/components/AboutCard", () => (props) => {
  return (
    <div data-testid="about-card">
      <p>{props.developer.name}</p>
      <p>{props.developer.role}</p>
    </div>
  );
});

describe("About Page", () => {
  test("renders the correct number of AboutCards with developer details", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Check if the correct number of AboutCards are rendered
    const aboutCards = screen.getAllByTestId("about-card");
    expect(aboutCards.length).toBe(5); // Adjust this number based on the team size

    // Check for specific developer names
    expect(screen.getByText("Amna Ali")).toBeInTheDocument();
    expect(screen.getByText("Andrew Harvey")).toBeInTheDocument();
    expect(screen.getByText("Rubi Rojas")).toBeInTheDocument();
    expect(screen.getByText("Allison Still")).toBeInTheDocument();
    expect(screen.getByText("Ethan Yu")).toBeInTheDocument();

    // Check for specific developer roles
    screen.getAllByText("Frontend Developer").forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
  });
});
