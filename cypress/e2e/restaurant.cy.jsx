/// <reference types="cypress" />

const typeAndAssert = (selector, value) => {
  cy.get(selector).type(value).should("have.value", value);
};

describe("showing the restaurant/menu component", () => {
  const restaurantId = "3bdGxrc3e1yFzHcVGw5Y";

  beforeEach(() => {
    cy.intercept("GET", `/api/restaurant/${restaurantId}`).as("getRestaurant");
    cy.visit("http://localhost:5173/registro");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="email"]').scrollIntoView().should("be.visible");
    cy.get('input[name="password"]').scrollIntoView().should("be.visible");
    cy.get('input[name="phone"]').scrollIntoView().should("be.visible");
    cy.get('input[name="birthDate"]').scrollIntoView().should("be.visible");
    cy.get('select[name="rol"]').scrollIntoView().should("be.visible");
  });

  it("should render the app", () => {
    typeAndAssert('input[name="name"]', "John2");
    typeAndAssert('input[name="lastName"]', "Doe2");
    typeAndAssert('input[name="email"]', "john2.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    typeAndAssert('input[name="phone"]', "628074495");
    typeAndAssert('input[name="birthDate"]', "1990-01-01");
    cy.get('select[name="rol"]').select("owner");
    cy.get('select[name="restId"]').select(restaurantId);
    cy.get('button[type="submit"]').click();
    cy.visit(`http://localhost:5173/restaurant/${restaurantId}`);
    cy.wait("@getRestaurant", { timeout: 1000 });
    cy.get("h2").should("exist");
    cy.get("button").should("exist");
    cy.get("img").should("exist");
    cy.get("p").should("exist");
    // showing the restaurant menu
    cy.get("button").eq(0).click();
    cy.get("button").should("exist");
    cy.get("h2").should("exist");
    cy.get("span").should("exist");
    cy.get("div").should("exist");
    cy.get("p").should("exist");
  });
});
