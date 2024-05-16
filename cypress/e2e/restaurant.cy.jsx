/// <reference types="cypress" />

let restaurantId;

describe("showing the restaurant/menu component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/restaurant");

    // Interceptamos la solicitud GET y extraemos el ID del restaurante de la URL
    cy.intercept("GET", /\/api\/restaurant\/(.*)/).as("getRestaurant");
  });

  it("should render the app", () => {
    cy.wait("@getRestaurant").then((interception) => {
      // Extraemos el ID del restaurante de la URL
      const url = new URL(interception.request.url);
      restaurantId = url.pathname.split("/")[3];
    });

    cy.get("h2").should("exist");
    cy.get("button").should("exist");
    cy.get("img").should("exist");
    cy.get("p").should("exist");

    // showing the restaurant menu
    cy.get("button").eq(0).click();

    cy.intercept(
      "GET",
      `/api/restaurant/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/showSections`
    ).as("getSections");

    cy.get("button").should("exist");
    cy.get("h2").should("exist");
    cy.get("span").should("exist");
    cy.get("div").should("exist");
    cy.get("p").should("exist");
  });
});
