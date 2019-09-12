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