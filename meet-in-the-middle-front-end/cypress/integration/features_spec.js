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

  it("allows two addresses to be entered", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="address_text_box1"]')
      .type("50 Commercial St, Spitalfields, London E1 6LT, UK")
      .should(
        "have.value",
        "50 Commercial St, Spitalfields, London E1 6LT, UK"
      );
    cy.get('input[id="address_text_box2"]')
      .type("Vue Cinema London - Islington, Parkfield Street, Angel, London")
      .should(
        "have.value",
        "Vue Cinema London - Islington, Parkfield Street, Angel, London"
      );
  });

  it("allows you to click the find button", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="find_yourself"]').click;
  });

  it("allows you to click the second find button", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="find_a_friend"]').click;
  });

  it("allows you to click the find midl button", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="address_text_box1"]').type(
      "50 Commercial St, Spitalfields, London E1 6LT, UK"
    );
    cy.get('input[id="find_yourself"]').click;
    cy.get('input[id="address_text_box2"]').type(
      "36 Parkfield St, Islington, London N1 0PS, UK"
    );
    cy.get('input[id="find_a_friend"]').click;
    cy.get('input[id="find_midl"]').click;
  });
});
