/// <reference types="cypress" />

import {
  API_ENDPOINT,
  HTTP_METHOD,
  EMAIL_REQUIRED,
  USER_NOT_FOUND,
} from "./constants";

const typeAndAssert = (selector, value) => {
  cy.get(selector).type(value).should("have.value", value);
};

const setupIntercept = (statusCode, body) => {
  cy.intercept(HTTP_METHOD, API_ENDPOINT, {
    statusCode,
    body,
  }).as("loginApi");
};

describe("LoginPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("should login", () => {
    setupIntercept(200, {
      token: "123",
      userRole: "owner",
    });

    typeAndAssert('input[name="email"]', "owner@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginApi");
    cy.intercept("GET", "/scraping-data").as("getData");
    cy.wait(2000);
    cy.get('button').eq(1).click();
  });

  it("should show error when user not found", () => {
    setupIntercept(404, {
      email: USER_NOT_FOUND,
    });

    typeAndAssert('input[name="email"]', "wrong@gmail.com");
    typeAndAssert('input[name="password"]', "wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginApi");
    cy.get(".text-red-500").should("contain", USER_NOT_FOUND);
  });

  it("should show error when email is required", () => {
    setupIntercept(400, {
      email: EMAIL_REQUIRED,
    });

    cy.get('input[name="email"]').clear();
    typeAndAssert('input[name="password"]', "wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.wait("@loginApi");
    cy.get(".text-red-500").should("contain", EMAIL_REQUIRED);
  });
});
