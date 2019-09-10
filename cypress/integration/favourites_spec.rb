describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

describe("User can save their home address as a favourite", () => {
  it("visits the home page", () => {
    cy.visit("localhost:3000");
  });

  it("allows the user to enter an address", () => {
    cy.visit("localhost:3000");
    cy.get("#home_location_text_box")
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        'have.value',
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
  });

  it("allows two addresses to be entered", () => {
    cy.visit("localhost:3000");
    cy.get("#address_text_box1")
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        "have.value",
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );

});
