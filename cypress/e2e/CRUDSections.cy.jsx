/// <reference types="cypress" />

const type = (selector, value) => {
  cy.get(selector).type(value);
};

const loginAndSetup = () => {
  cy.visit("http://localhost:5173/");
  cy.get("button").eq(0).click();
  type('input[name="email"]', "you@gmail.com");
  type('input[name="password"]', "@Password1");
  cy.get('button[type="submit"]').click();
  cy.intercept("GET", "/api/restaurants/numberOfCities").as(
    "getNumberOfCities"
  );
  cy.wait("@getNumberOfCities");
  cy.get("button").eq(0).click();
  cy.viewport("macbook-16");
  cy.wait(2000);

  cy.get("button").eq(1).click();
  cy.viewport(1000, 660);
  cy.wait(2000);
};

describe("testing section creation", () => {
  it("can create sections", () => {
    loginAndSetup();
    cy.get("button", { timeout: 10000 }).eq(7).click();
    // close modal
    cy.get("button").eq(8).click({ force: true, multiple: true });
    // open modal
    cy.get("button").eq(7).click({ force: true });
    type('input[name="name"]', "Section 1");
    type('input[name="description"]', "Description 1");
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    // click on the section
    cy.get("button").eq(7).click({ force: true });
    cy.scrollTo("bottom");
  });
  it("can't create sections with invalid data", () => {
    loginAndSetup();
    cy.get("button").eq(8).click({ force: true, multiple: true });
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });
});

describe("testing section update", () => {
  it("can update sections", () => {
    loginAndSetup();
    cy.wait(2000);
    // navigate to the section
    cy.get("button").eq(7).click({ force: true });
    cy.scrollTo("bottom");
    // open the section modal
    cy.get("button").eq(6).click();
    // CONTINUE
  });
});
