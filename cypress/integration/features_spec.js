describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

describe("visiting the home page", () => {
  it("visits the home page", () => {
    cy.visit("localhost:3000");
  });
});

describe('entering an address', () => {
  it("allows the user to enter an address", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1")
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        'have.value',
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
  });
});

describe('entering multiple addresses', () => {
  it("allows two addresses to be entered", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1")
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        "have.value",
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
    cy.get("#address_text_box2")
      .type("Vue Cinema London - Islington, Parkfield Street, Angel, London")
      .should(
        "have.value",
        "Vue Cinema London - Islington, Parkfield Street, Angel, London"
      );
  });
});

describe('finding midl button', () => {
  it("allows you to click the find midl button", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1").type(
      "50 Commercial St, Spitalfields, London E1 6LT, UK"
    ).type('{enter}', {force: true});
    cy.get("#address_text_box2").type(
      "36 Parkfield St, Islington, London N1 0PS, UK"
    ).type('{enter}', {force: true});
    cy.get('#find_midl').click();
    cy.get('#midlLocation').should(
      "contain",
      "Bars"
    );
  });
});

describe('selecting transport type', () => {
  it("lets you choose your transport type for the midl Location", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1").type(
      "50 Commercial St, Spitalfields, London E1 6LT, UK"
    ).type('{enter}', {force: true});
    cy.get("#address_text_box2").type(
      "36 Parkfield St, Islington, London N1 0PS, UK"
    ).type('{enter}', {force: true});
    cy.get('#walking_Button_Midl').click();
    cy.get('#find_midl').click();
    cy.get('#bicycling_Button_JourneyA').click();
    cy.get('#journeyTimeDisplayA').should(
      "contain",
      "Cycling"
    );
  });
});

describe('selecting transport type for journey', ()=> {
  it("lets you choose your transport type for the Journey", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1").type(
      "50 Commercial St, Spitalfields, London E1 6LT, UK"
    ).type('{enter}', {force: true});
    cy.get("#address_text_box2").type(
      "36 Parkfield St, Islington, London N1 0PS, UK"
    ).type('{enter}', {force: true});
    cy.get('#walking_Button_Midl').click();
    cy.get('#find_midl').click();
    cy.get('#bicycling_Button_JourneyA').click();
    cy.get('#journeyTimeDisplayA').should(
      "contain",
      "Cycling"
    );
  });
});
