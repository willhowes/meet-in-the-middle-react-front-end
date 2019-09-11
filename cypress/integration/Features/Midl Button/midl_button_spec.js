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