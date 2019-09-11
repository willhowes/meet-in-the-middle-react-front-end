describe("shows cafe recommendations", () => {
    it("Offers cafe recommendations", () => {
      cy.visit("localhost:3000");
      cy.get("#address_text_box1")
        .type("50 Commercial St, Spitalfields, London E1 6LT, UK").type('{enter}')
      cy.get("#address_text_box2")
        .type("40 Commercial St, Spitalfields, London E1 6LP, UK").type('{enter}')
        cy.get("#find_midl").click()
        cy.get('li').eq(2).click()
        cy.contains("Cafe 1001")
    });
  });