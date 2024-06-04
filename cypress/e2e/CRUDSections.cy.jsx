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
  cy.visit("http://localhost:5173/3bdGxrc3e1yFzHcVGw5Y/menu");
  cy.wait(2000);
};

describe("testing section creation", () => {
  it("can create sections", () => {
    loginAndSetup();
    cy.wait(2000);
    cy.contains("Bebidas")
      .parent("div")
      .nextUntil("span[class='ml-1']")
      .contains("Añadir nueva sección");
    cy.wait(2000);
    cy.contains("Añadir nueva sección").prev("button").click();
    cy.get('input[name="name"]').type("Seccion de prueba");
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
  });
  it("can't create sections with invalid data", () => {
    loginAndSetup();
    cy.contains("Añadir nueva sección").prev("button").click();
    cy.get('button[type="submit"]').click();
    cy.contains("El nombre es obligatorio");
    cy.get(".modal-content").contains("Cerrar").click();
  });
});

describe("testing section update", () => {
  it("can update sections", () => {
    loginAndSetup();
    cy.contains("Seccion de prueba")
      .parent()
      .within(() => {
        cy.get("button").click();
      });
    cy.scrollTo("bottom");
    cy.wait(2000);
    cy.get("div[id='Seccion de prueba']").within(() => {
      cy.get("button").eq(0).click();
    });
    cy.wait(2000);
    cy.get('input[name="name"]')
      .first()
      .clear({ force: true })
      .type("Actualizada", { force: true });
    cy.get('button[type="submit"]').first().click({ force: true });
    cy.wait(2000);
    cy.scrollTo("bottom");
  });
});
describe("testing section deletion", () => {
  it("can delete sections", () => {
    loginAndSetup();
    cy.contains("Actualizada")
      .parent()
      .within(() => {
        cy.get("button").click();
      });
    cy.scrollTo("bottom");
    cy.wait(2000);
    cy.get("div[id='Actualizada']").within(() => {
      cy.get("button").eq(1).click();
    });
    cy.wait(2000);
    cy.get("button").contains("Sí").click();
    cy.wait(2000);
  });
});
