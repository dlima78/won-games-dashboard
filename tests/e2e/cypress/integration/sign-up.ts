/// <reference path="../support/index.d.ts" />
import faker from "@faker-js/faker"

const baseUrl: string = Cypress.config().baseUrl

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

  it('should not present error message if form is valid', () => {
    cy.findByPlaceholderText(/nome/i)
    .type(faker.name.findName())
    .blur()
    cy.findByText(/o campo precisa ter no minimo 3 caracteres/i).should('not.exist')
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    const password = faker.random.alphaNumeric(6)
    cy.findByText(/campo email inválido/i).should('not.exist')
    cy.findByPlaceholderText('Senha')
    .type(password)
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('not.exist')
    cy.findByPlaceholderText(/confirme a senha/i)
    .type(password)
    .blur()
    cy.findByText('Confirmação de senha inválida').should('not.exist')
  })

  it('should present UnexpectedError on 400', () => {
    cy.intercept('POST', /signup/ , {
        statusCode: 400
      }
    ).as('invalidPost')
    cy.findByPlaceholderText(/nome/i)
    .type(faker.internet.email())
    .blur()
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    const password = faker.random.alphaNumeric(6)
    cy.findByPlaceholderText('Senha')
    .type(password)
    .blur()
    cy.findByPlaceholderText(/confirme a senha/i)
    .type(password)
    .blur()
    cy.get('form').submit()
    cy.wait('@invalidPost')
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.findByText('Algo de errado acounteceu. Tente novamente em breve.').should('exist')
    cy.url().should('eq', `${baseUrl}/sign-up`)
  })

  it('should save accessToken if credentials is valid', () => {
    const token = faker.datatype.uuid()
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        accessToken: token
      }
    }).as('validPost')
    cy.findByPlaceholderText(/nome/i)
    .type(faker.internet.email())
    .blur()
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    const password = faker.random.alphaNumeric(6)
    cy.findByPlaceholderText('Senha')
    .type(password)
    .blur()
    cy.findByPlaceholderText(/confirme a senha/i)
    .type(password)
    .blur()
    cy.findByRole('button', { name: /cadastrar/i}).click()
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})