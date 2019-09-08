describe("recommendations", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("brings up recommendations after a search", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="address_text_box0"]')
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK").type('{enter}')

    cy.get('input[id="address_text_box1"]')
      .type("Vue Cinema London - Islington, Parkfield Street, Angel, London").type('{enter}')
      cy.get('input[id="find_midl"]').click;
  });
});

