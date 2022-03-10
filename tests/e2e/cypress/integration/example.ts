/// <reference path="../support/index.d.ts" />
describe('Cypress TS', () => {
  beforeEach(() => {
    cy.visit('sign-in')
  })

  it('should load with correct initial state', () => {
    cy.findByPlaceholderText(/email/i)
    cy.findByPlaceholderText(/senha/i)
    cy.findByRole('link', { name: /esqueceu a senha?/i})
    cy.findByRole('button', { name: /entrar/i}).should('have.attr', 'disabled')
    cy.findByRole('link', { name: /criar conta/i})
  });
})