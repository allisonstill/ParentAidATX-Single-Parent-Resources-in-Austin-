import { render, screen, waitFor } from "@testing-library/react";
import Housing from "../src/pages/Housing.jsx";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock CSS imports to prevent Jest errors
jest.mock("../src/pages/Housing.css", () => ({}));
jest.mock("../src/components/housingCard.css", () => ({}));
jest.mock("../src/pages/Search.css", () => ({}));
jest.mock("../src/utils/getDrivingDistance", () => ({
  getDrivingDistance: jest.fn(() => Promise.resolve(5)), // fake value in miles
}));

// Mock the BookCard component to check its rendering
jest.mock("../src/components/housingCard", () => (props) => {
  return (
    <div data-testid="housing-card">
      <h3>{props.name}</h3>
      <p>{props.address}</p>
      <p>{props.phone_number}</p>
      <p>{props.website}</p>
      <p>{props.rating}</p>
      <p>{props.totalRatings}</p>
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
            name: "Villas On Guadalupe",
            address: "2810 Hemphill Park, Austin, TX 78705, USA",
            phone_number: "(737) 497-4094",
            website:
              "https://www.villasonguadalupe.com/?switch_cls%5Bid%5D=68820",
            rating: "3.1",
            totalRatings: "187",
          },
          {
            id: 2,
            name: "Villas on Rio",
            address: "2111 Rio Grande St, Austin, TX 78705, USA",
            phone_number: "(512) 254-0282",
            website: "https://villasonrio.com",
            rating: "4.1",
            totalRatings: "320",
          },
          {
            id: 3,
            name: "Housing Authority of the City of Austin",
            address: "1124 S I-35 Frontage Rd, Austin, TX 78704, USA",
            phone_number: "(512) 477-4488",
            website: "https://www.hacanet.org",
            rating: "3.7",
            totalRatings: "85",
          },
        ]),
    })
  );
});

// Cleanup fetch mock after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Housing Page", () => {
  test("renders the HousingCard component correctly with housing details", async () => {
    render(
      <MemoryRouter>
        <Housing />
      </MemoryRouter>
    );

    // Wait for BookCards to load
    const housingCards = await screen.findAllByTestId("housing-card");
    expect(housingCards.length).toBe(3); // Ensure the correct number of books are rendered

    // Verify BookCard content for each book
    const firstHousingCard = housingCards[0];
    expect(firstHousingCard).toHaveTextContent("Villas On Guadalupe");
    expect(firstHousingCard).toHaveTextContent(
      "2810 Hemphill Park, Austin, TX 78705, USA"
    );
    expect(firstHousingCard).toHaveTextContent("(737) 497-4094");
    expect(firstHousingCard).toHaveTextContent(
      "https://www.villasonguadalupe.com/?switch_cls%5Bid%5D=68820"
    );
    expect(firstHousingCard).toHaveTextContent("3.1");
    expect(firstHousingCard).toHaveTextContent("187");

    const secondHousingCard = housingCards[1];
    expect(secondHousingCard).toHaveTextContent("Villas on Rio");
    expect(secondHousingCard).toHaveTextContent(
      "2111 Rio Grande St, Austin, TX 78705, USA"
    );
    expect(secondHousingCard).toHaveTextContent("(512) 254-0282");
    expect(secondHousingCard).toHaveTextContent("https://villasonrio.com");
    expect(secondHousingCard).toHaveTextContent("4.1");
    expect(secondHousingCard).toHaveTextContent("320");

    const thirdHousingCard = housingCards[2];
    expect(thirdHousingCard).toHaveTextContent(
      "Housing Authority of the City of Austin"
    );
    expect(thirdHousingCard).toHaveTextContent(
      "1124 S I-35 Frontage Rd, Austin, TX 78704, USA"
    );
    expect(thirdHousingCard).toHaveTextContent("(512) 477-4488");
    expect(thirdHousingCard).toHaveTextContent("https://www.hacanet.org");
    expect(thirdHousingCard).toHaveTextContent("3.7");
    expect(thirdHousingCard).toHaveTextContent("85");
  });
});
