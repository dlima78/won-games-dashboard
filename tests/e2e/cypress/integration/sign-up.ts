/// <reference path="../support/index.d.ts" />
import faker from "@faker-js/faker"

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

  it('should present error if form is invalid', () => {
    cy.findByPlaceholderText(/nome/i)
    .type(faker.random.alphaNumeric(1))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 3 caracteres/i).should('exist')
    cy.findByPlaceholderText(/email/i)
    .type(faker.random.word())
    .blur()
    cy.findByText(/campo email inválido/i).should('exist')
    cy.findByPlaceholderText('Senha')
    .type(faker.random.alphaNumeric(3))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('exist')
    cy.findByPlaceholderText(/confirme a senha/i)
    .type(faker.random.word())
    .blur()
    cy.findByText('Confirmação de senha inválida').should('exist')
  })

})