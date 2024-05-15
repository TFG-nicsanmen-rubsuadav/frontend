/// <reference types="cypress" />

import {
  API_ENDPOINT2,
  HTTP_METHOD,
  EMAIL_REQUIRED2,
  NAME_REQUIRED,
  LASTNAME_REQUIRED,
  PASSWORD_REQUIRED,
  PHONE_REQUIRED,
  BIRTHDATE_REQUIRED,
  ROL_REQUIRED,
  INVALID_EMAIL,
  INVALID_PHONE,
} from "./constants";

const typeAndAssert = (selector, value) => {
  cy.get(selector).type(value).should("have.value", value);
};

const setupIntercept = (statusCode, body) => {
  cy.intercept(HTTP_METHOD, API_ENDPOINT2, {
    statusCode,
    body,
  }).as("registerApi");
};

describe("RegisterPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/registro");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="email"]').scrollIntoView().should("be.visible");
    cy.get('input[name="password"]').scrollIntoView().should("be.visible");
    cy.get('input[name="phone"]').scrollIntoView().should("be.visible");
    cy.get('input[name="birthDate"]').scrollIntoView().should("be.visible");
    cy.get('select[name="rol"]').scrollIntoView().should("be.visible");
  });

  it("should register", () => {
    setupIntercept(201, {
      sessionId: "123",
      rol: {
        customer: false,
      },
    });

    typeAndAssert('input[name="name"]', "John2");
    typeAndAssert('input[name="lastName"]', "Doe2");
    typeAndAssert('input[name="email"]', "john2.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    typeAndAssert('input[name="phone"]', "1234567810");
    typeAndAssert('input[name="birthDate"]', "1990-01-01");
    cy.get('select[name="rol"]').select("customer");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when name is required", () => {
    setupIntercept(400, {
      name: NAME_REQUIRED,
    });
    cy.get('input[name="name"]').clear();
    cy.get('select[name="rol"]').select("customer");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when lastName is required", () => {
    setupIntercept(400, {
      lastName: LASTNAME_REQUIRED,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    cy.get('input[name="lastName"]').clear();
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when email is required", () => {
    setupIntercept(400, {
      email: EMAIL_REQUIRED2,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    cy.get('input[name="email"]').clear();
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
    cy.get(".text-red-500").should("contain", EMAIL_REQUIRED2);
  });

  it("should show error when email is invalid", () => {
    setupIntercept(400, {
      email: INVALID_EMAIL,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "dddd@ndjed.codd");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
    cy.get(".text-red-500").should("contain", INVALID_EMAIL);
  });

  it("should show error when password is required", () => {
    setupIntercept(400, {
      password: PASSWORD_REQUIRED,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "john.doe@gmail.com");
    cy.get('input[name="password"]').clear();
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when phone is required", () => {
    setupIntercept(400, {
      phone: PHONE_REQUIRED,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "john.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    cy.get('input[name="phone"]').clear();
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when phone is invalid", () => {
    setupIntercept(400, {
      phone: INVALID_PHONE,
    });

    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "john.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    typeAndAssert('input[name="phone"]', "1234567890");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when birthDate is required", () => {
    setupIntercept(400, {
      birthDate: BIRTHDATE_REQUIRED,
    });
    cy.get('select[name="rol"]').select("customer");
    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "john.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    typeAndAssert('input[name="phone"]', "628018419");
    cy.get('input[name="birthDate"]').clear();
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
  });

  it("should show error when rol is required", () => {
    setupIntercept(400, {
      rol: ROL_REQUIRED,
    });

    typeAndAssert('input[name="name"]', "John");
    typeAndAssert('input[name="lastName"]', "Doe");
    typeAndAssert('input[name="email"]', "john.doe@gmail.com");
    typeAndAssert('input[name="password"]', "@Password1");
    typeAndAssert('input[name="phone"]', "628018419");
    typeAndAssert('input[name="birthDate"]', "1998-08-16");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerApi");
    cy.get(".text-red-500").should("contain", ROL_REQUIRED);
  });
});
