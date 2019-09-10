describe('log in form', function () {
  it('can submit a valid form', function () {
    cy.visit('localhost:3000')
    cy.get('input[id="log_in_button"]').click;
    cy.get('input[id="log_in_email"]').type('test@test.com')
    cy.get('input[id="log_in_password').type('123456')
    cy.get('form').submit()
  })
})
