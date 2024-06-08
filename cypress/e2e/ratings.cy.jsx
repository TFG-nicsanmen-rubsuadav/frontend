/// <reference types="cypress" />

describe("testing ratings restaurant", () => {
  it("can display restaurant ratings", () => {
    cy.visit("http://localhost:5173/");
    cy.get("select").select(1);
    cy.get("input").type(" ");
    cy.get('div[title^="/restaurant/"]').first().click();
    cy.get("button").contains("Valoraciones").click();
    cy.wait(2000);
    cy.get('button:contains("Leer Mas")').scrollIntoView().click();
    cy.get('button:contains("Ocultar Valoraciones")').scrollIntoView().click();
  });
});
