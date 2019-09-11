describe("shows museum recommendations", () => {
    it("shows museum recommendations", () => {
      cy.visit("localhost:3000");
      cy.get("#address_text_box1")
        .type("Exhibition Rd, South Kensington, London SW7 2DD, UK").type('{enter}')
      cy.get("#address_text_box2")
        .type("Cromwell Rd, South Kensington, London SW7 5BD, UK").type('{enter}')
        cy.get("#find_midl").click()
        cy.get('li').eq(4).click()
        cy.contains("Natural History Museum")
        cy.contains("Science Museum")
    });
  });