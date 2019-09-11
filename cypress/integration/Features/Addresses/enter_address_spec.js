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