describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

describe("visiting the home page", () => {
  it("visits the home page", () => {
    cy.visit("localhost:3000");
  });

  it("allows the user to enter an address", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="address_text_box1"]')
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        "have.value",
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
  });
});
