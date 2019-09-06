describe("user can sign up", () => {
  it("click on sign up button", () => {
    cy.visit("localhost:3000");
    cy.get('input[id="sign_up_button"]').click;
  });
});
