describe('log in form', function () {
  it('can log out of the app', function () {
    cy.visit('localhost:3000')
    cy.get('input[id="log_in_button"]').click({ force: true });
    cy.get('input[id="log_in_email"]').type('test@test.com')
    cy.get('input[id="log_in_password').type('123456')
    cy.get('input[id="log_in_submit"]').click({ force: true });

    cy.get('input[id="log_out_button"]').click({ force: true });
    cy.get('input[id="log_out_confirm"]').click({ force: true });

  })
})
