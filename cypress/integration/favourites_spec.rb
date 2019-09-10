describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

describe("User can save their home address as a favourite", () => {

  it("allows the user to enter an address", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="profile_button"]').click;
    cy.get("#home_location_text_box")
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        'have.value',
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
  });
});
