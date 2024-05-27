/// <reference types="cypress" />

describe("rendering App component", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/restaurants/numberOfCities").as(
      "getNumberOfCities"
    );
    cy.intercept("GET", "/api/restaurants/numberOfOpinions").as(
      "getNumberOfOpinions"
    );
    cy.visit("http://localhost:5173/");
    cy.wait("@getNumberOfCities");
    cy.wait("@getNumberOfOpinions");

    cy.get("h1").should("be.visible");
    cy.get("h3").should("be.visible");
    cy.get("h3").eq(1).should("have.text", "CIUDADES");
    cy.get("h3").eq(2).should("have.text", "OPINIONES");

    // bar search assertions
    cy.get("input").should("be.visible");
    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Nombre del restaurante"
    );
    cy.get("select").should("be.visible");
    cy.get("select").should("have.attr", "name", "city");
  });

  it("can't search restaurants cause missing data", () => {
    cy.get("select").select(1);
    // showing error Missing query parameters
    cy.get("p").should("be.visible");
    cy.get("p").should("have.text", "Missing query parameters");
  });

  it("can search restaurants", () => {
    cy.get("select").select(1);
    cy.get("input").type(" ");
  });
});
