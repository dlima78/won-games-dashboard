/// <reference path="../support/index.d.ts" />
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('sign-up')
  })

  it('should load with correct initial state', () => {
    cy.findByPlaceholderText(/nome/i).should('exist')
    cy.findByPlaceholderText(/email/i).should('exist')
    cy.findByPlaceholderText('Senha').should('exist')
    cy.findByPlaceholderText(/confirme a senha/i).should('exist')
    cy.findByRole('button', { name: /cadastrar/i}).should('have.attr', 'disabled')
    cy.findByRole('link', { name: /já possui conta?/i}).should('exist')
  })
})