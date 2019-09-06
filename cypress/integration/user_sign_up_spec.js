describe("user can sign up", () => {
  it("click on sign up button", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="sign_up_button"]').click;
    cy.get('input[id="user_name"]')
      .type("Test User")
      .should(
        "have.value",
        "Test User"
      );
  });
});
