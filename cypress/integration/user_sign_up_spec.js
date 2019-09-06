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
    cy.get('input[id="user_email"]')
      .type("test@user.com")
      .should(
        "have.value",
        "test@user.com"
      );
    cy.get('input[id="user_password"]')
      .type("123456")
      .should(
        "have.value",
        "123456"
      );
    cy.get('input[id="user_password_confirmation"]')
      .type("123456")
      .should(
        "have.value",
        "123456"
      );
  });
});
