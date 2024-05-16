/// <reference types="cypress" />

describe("showing the restaurant/menu component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/restaurant");
  });

  it("should render the app", () => {
    cy.intercept("GET", `/api/restaurant/3bdGxrc3e1yFzHcVGw5Y`).as(
      "getRestaurant"
    );

    cy.get("h2").should("exist");
    cy.get("button").should("exist");
    cy.get("img").should("exist");
    cy.get("p").should("exist");

    // showing the restaurant menu
    cy.get("button").eq(0).click();

    cy.intercept(
      "GET",
      `/api/restaurant/3bdGxrc3e1yFzHcVGw5Y/zUKq6KT3LRmYAe2yLOCR/showSections`
    ).as("getSections");

    cy.get("button").should("exist");
    cy.get("h2").should("exist");
    cy.get("span").should("exist");
    cy.get("div").should("exist");
    cy.get("p").should("exist");
  });
});
