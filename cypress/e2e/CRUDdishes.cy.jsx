import { API_ENDPOINT, HTTP_METHOD } from "./constants";

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
  cy.intercept(HTTP_METHOD, API_ENDPOINT).as("loginApi");
  cy.wait(2000);
  cy.intercept("GET", "/api/restaurants/numberOfCities").as(
    "getNumberOfCities"
  );
  cy.visit("http://localhost:5173/3bdGxrc3e1yFzHcVGw5Y/menu");
  cy.wait(2000);
};

const selectModalCreation = () => {
  cy.get("div[id='Entrantes']").within(() => {
    cy.get("#addDishButton").within(() => {
      cy.get("button").click();
    });
  });
  cy.wait(3000);
  cy.get('form[id="modal"]');
};

const openUpdateDeletionModal = (text, element) => {
  cy.get("div[id='Entrantes']").within(() => {
    cy.get("h3")
      .contains(text)
      .parent()
      .parent()
      .within(() => {
        cy.get(element).click();
      });
  });
  cy.wait(2000);
};

describe("testing dishes creation", () => {
  it("can create an unique price dish", () => {
    loginAndSetup();
    selectModalCreation();
    cy.get('input[name="name"]').eq(3).type("Plato de prueba");
    cy.get('input[name="description"]').eq(3).type("Descripción de prueba");
    cy.get('div[id="allergens"]').eq(3).click().type("gluten{enter}");
    cy.get('button[id="unique"]').eq(3).click();
    cy.get('input[type="number"]').clear().type("10");
    cy.get('button[type="submit"]').eq(3).click();
    cy.wait(2000);
  });
  it("can create a dish with rations", () => {
    loginAndSetup();
    selectModalCreation();
    cy.get('input[name="name"]').eq(3).type("Plato de prueba2");
    cy.get('button[id="rations"]').eq(3).click();
    // seleccionamos tapa
    cy.get('button[id="rationsButtons"]').eq(0).click();
    cy.get('input[type="number"]').clear().type("2.5");
    cy.get('button[type="submit"]').eq(3).click();
    cy.wait(2000);
  });
  it("can't create sections with invalid data (name isn't provide)", () => {
    loginAndSetup();
    selectModalCreation();
    cy.get('button[id="unique"]').eq(3).click();
    cy.get('input[type="number"]').clear().type("10");
    cy.get('button[type="submit"]').eq(3).click();
    cy.wait(2000);
  });
  it("can't create sections with invalid data (unique price isn't provide)", () => {
    loginAndSetup();
    selectModalCreation();
    cy.get('input[name="name"]').eq(3).type("Plato de prueba");
    cy.get('button[type="submit"]').eq(3).click();
    cy.wait(2000);
  });
});

describe("testing dishes update", () => {
  it("can update dish (name = Plato de prueba)", () => {
    loginAndSetup();
    openUpdateDeletionModal("Plato de prueba", "#editDishButton");
    cy.get('form[id="modal"]');
    cy.get('input[name="name"]').eq(3).clear().type("Plato de prueba updated");
    cy.get('button[id="unique"]').eq(3).click();
    cy.get('button[type="submit"]').eq(3).click();
    cy.wait(2000);
  });
});

describe("testing dishes deletion", () => {
  it("can delete dish (name = Plato de prueba updated)", () => {
    loginAndSetup();
    openUpdateDeletionModal("Plato de prueba updated", "#deleteDishButton");
    cy.get("button").contains("Sí").click();
    cy.wait(2000);
  });
  it("can delete dish (name = Plato de prueba2)", () => {
    loginAndSetup();
    openUpdateDeletionModal("Plato de prueba2", "#deleteDishButton");
    cy.get("button").contains("Sí").click();
    cy.wait(2000);
  });
});
