/// <reference types="cypress" />

const type = (selector, value) => {
  cy.get(selector).type(value);
};

describe("testing dashboard page", () => {
  it("can navigate to the dashboard page cause is login with an owner account", () => {
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
    cy.window().then((win) => {
      cy.intercept(
        "GET",
        `/api/restaurant/restaurantByUser?userId=${win.localStorage.getItem(
          "userId"
        )}`
      ).as("restaurantByUser");
    });
    cy.wait("@restaurantByUser").then((restaurantId) => {
      cy.intercept("GET", `/api/restaurant/${restaurantId}`);
      cy.intercept("GET", `/api/restaurant/${restaurantId}/visits`).as(
        "totalVisits"
      );
      cy.wait(2000);
      const date = cy.get("select").select(0);
      cy.intercept(
        "GET",
        `/api/restaurant/${restaurantId}/visitsByDate?date=${date}`
      ).as("visitsByDate");
      cy.wait(2000);
      cy.get("select").select(1);

      cy.viewport("macbook-11")
      cy.get("button").eq(2).click();
      cy.wait(2000);
    });
  });
  it("can't navigate to the dashboard page cause isn't login", () => {
    cy.visit("http://localhost:5173/dashboard");
    cy.url().should("include", "/");
  });
});
