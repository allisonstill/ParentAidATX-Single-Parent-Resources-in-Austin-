import { render, screen, waitFor } from "@testing-library/react";
import Housing from "../src/pages/Housing.jsx";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock CSS imports to prevent Jest errors
jest.mock("../src/pages/Housing.css", () => ({}));
jest.mock("../src/components/housingCard.css", () => ({}));

// Mock the HousingCard component to check its rendering
jest.mock("../src/components/housingCard", () => (props) => {
  return (
    <div data-testid="housing-card">
      <h3>{props.name}</h3>
      <p>{props.cost}</p>
      <p>{props.rating}</p>
      <p>{props.HousingStyle}</p>
      <p>{props.Address}</p>
      <p>{props.website}</p>
    </div>
  );
});

// Mock Housing Data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Kensington Apartments",
            cost: "900-1300",
            rating: "3.9",
            HousingStyle: "Apartments",
            Address: "2202 W N Loop Blvd, Austin, TX 78756",
            website: "https://www.rainieratx.com/kensington-apartments",
          },
          {
            id: 2,
            name: "Salvation Army Social Services Center",
            cost: "0",
            rating: "3.8",
            HousingStyle: "Shelter",
            Address: "4613 Tannehill Ln Bldg 1, Austin, TX 78721",
            website: "https://salvationarmyaustin.org/",
          },
          {
            id: 3,
            name: "Pathways at North Loop Apartments",
            cost: "1000-1100",
            rating: "3.3",
            HousingStyle: "Apartments",
            Address: "2300 W N Loop Blvd #101, Austin, TX 78756",
            website: "https://www.pathwaysatnorthloop.org/brochure.aspx",
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

    // Wait for HousingCards to load
    const housingCards = await screen.findAllByTestId("housing-card");
    expect(housingCards.length).toBe(3); // Ensure the correct number of housing listings are rendered

    // Verify HousingCard content for each listing
    const firstHousingCard = housingCards[0];
    expect(firstHousingCard).toHaveTextContent("Kensington Apartments");
    expect(firstHousingCard).toHaveTextContent("900-1300");
    expect(firstHousingCard).toHaveTextContent("3.9");
    expect(firstHousingCard).toHaveTextContent("Apartments");
    expect(firstHousingCard).toHaveTextContent(
      "2202 W N Loop Blvd, Austin, TX 78756"
    );
    expect(firstHousingCard).toHaveTextContent(
      "https://www.rainieratx.com/kensington-apartments"
    );

    const secondHousingCard = housingCards[1];
    expect(secondHousingCard).toHaveTextContent(
      "Salvation Army Social Services Center"
    );
    expect(secondHousingCard).toHaveTextContent("0");
    expect(secondHousingCard).toHaveTextContent("3.8");
    expect(secondHousingCard).toHaveTextContent("Shelter");
    expect(secondHousingCard).toHaveTextContent(
      "4613 Tannehill Ln Bldg 1, Austin, TX 78721"
    );
    expect(secondHousingCard).toHaveTextContent(
      "https://salvationarmyaustin.org/"
    );

    const thirdHousingCard = housingCards[2];
    expect(thirdHousingCard).toHaveTextContent(
      "Pathways at North Loop Apartments"
    );
    expect(thirdHousingCard).toHaveTextContent("1000-1100");
    expect(thirdHousingCard).toHaveTextContent("3.3");
    expect(thirdHousingCard).toHaveTextContent("Apartments");
    expect(thirdHousingCard).toHaveTextContent(
      "2300 W N Loop Blvd #101, Austin, TX 78756"
    );
    expect(thirdHousingCard).toHaveTextContent(
      "https://www.pathwaysatnorthloop.org/brochure.aspx"
    );
  });
});
