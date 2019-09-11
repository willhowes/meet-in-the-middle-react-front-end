describe('log in form', function () {
  it('can submit a valid form', function () {


    cy.visit("localhost:3000");
    cy.get('input[id="sign_up_button"]').click({ force: true });
    cy.get('input[id="user_name"]')
      .type("Test User");
    cy.get('input[id="user_email"]')
      .type("test@user.com");
    cy.get('input[id="user_password"]')
      .type("123456");
    cy.get('input[id="user_password_confirmation"]')
      .type("123456");
    cy.get('input[id="sign_up_submit"]').click({ force: true });


    cy.visit('localhost:3000')
    cy.get('input[id="log_in_button"]').click({ force: true });
    cy.get('input[id="log_in_email"]').type('test@test.com')
    cy.get('input[id="log_in_password').type('123456')
    cy.get('input[id="log_in_submit"]').click({ force: true });


  })
})
