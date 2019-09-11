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