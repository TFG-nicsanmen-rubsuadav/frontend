/// <reference types="cypress" />

const type = (selector, value) => {
  cy.get(selector).type(value);
};

describe("testing SR", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    type('input[name="email"]', "you@gmail.com");
    type('input[name="password"]', "@Password1");
    cy.get('button[type="submit"]').click();
  });
  it("can recommend restaurants", () => {
    cy.get("button").eq(2).click();
    cy.intercept("GET", "/api/recommendations").as("recommendations");
    cy.wait("@recommendations");
    cy.get('div[title^="/restaurant/"]').first().click();
  });
});
