/// <reference path="../support/index.d.ts" />
import faker from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Cypress TS', () => {
  beforeEach(() => {
    cy.visit('sign-in')
  })

  it('should load with correct initial state', () => {
    cy.findByPlaceholderText(/email/i).should('exist')
    cy.findByPlaceholderText(/senha/i).should('exist')
    cy.findByRole('link', { name: /esqueceu a senha?/i}).should('exist')
    cy.findByRole('button', { name: /entrar/i}).should('have.attr', 'disabled')
    cy.findByRole('link', { name: /criar conta/i}).should('exist')
  })

  it('should present error if form is invalid', () => {
    cy.findByPlaceholderText(/email/i)
    .type(faker.random.word())
    .blur()
    cy.findByText(/campo email inválido/i).should('exist')
    cy.findByPlaceholderText(/senha/i)
    .type(faker.random.alphaNumeric(3))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('exist')
  })

  it('should not present error message if form is valid', () => {
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    cy.findByText(/campo email inválido/i).should('not.exist')
    cy.findByPlaceholderText(/senha/i)
    .type(faker.internet.password(5))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('not.exist')
  })

  it('should present error if credentials is invalid', () => {
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    cy.findByText(/campo email inválido/i).should('not.exist')
    cy.findByPlaceholderText(/senha/i)
    .type(faker.internet.password(5))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('not.exist')
    cy.findByRole('button', { name: /entrar/i })
    .click()
    cy.get('[data-testid=spinner]').should('exist')
    cy.findByText(/credenciais inválidas/i).should('exist')
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/sign-in`)
  })

  it('should save accessToken if credentials is valid', () => {
    cy.findByPlaceholderText(/email/i)
    .type('teste@teste.com')
    .blur()
    cy.findByText(/campo email inválido/i).should('not.exist')
    cy.findByPlaceholderText(/senha/i)
    .type('123456')
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('not.exist')
    cy.findByRole('button', { name: /entrar/i })
    .click()
    cy.get('[data-testid=spinner]').should('exist')
    cy.findByText(/credenciais inválidas/i).should('not.exist')
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})