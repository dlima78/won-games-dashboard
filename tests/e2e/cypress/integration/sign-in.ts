/// <reference path="../support/index.d.ts" />
import faker from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('SignIn', () => {
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

  it('should present UnexpectedError on 400', () => {
    cy.intercept('POST', /login/ , {
        statusCode: 400
      }
    ).as('invalidPost')
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    cy.findByPlaceholderText(/senha/i)
    .type(faker.internet.password(5))
    .blur()
    cy.get('form').submit()
    cy.wait('@invalidPost')
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.findByText('Algo de errado acounteceu. Tente novamente em breve.').should('exist')
    cy.url().should('eq', `${baseUrl}/sign-in`)
  })

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/ , {
        statusCode: 401,
        body: {
          error: faker.random.words()
        }
      }
    ).as('invalidCredentials')
    cy.findByPlaceholderText(/email/i)
    .type(faker.internet.email())
    .blur()
    cy.findByText(/campo email inválido/i).should('not.exist')
    cy.findByPlaceholderText(/senha/i)
    .type(faker.internet.password(5))
    .blur()
    cy.findByText(/o campo precisa ter no minimo 5 caracteres/i).should('not.exist')
    cy.get('form').submit()
    cy.wait('@invalidCredentials')
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.findByText(/credenciais inválidas/i).should('exist')
    cy.url().should('eq', `${baseUrl}/sign-in`)
  })

  it('should save accessToken if credentials is valid', () => {
    const token = faker.datatype.uuid()
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: token
      }
    }).as('validPost')
    cy.signIn()
    cy.get('[data-testid=spinner]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should prevent multiple submits', () => {
    const token = faker.datatype.uuid()
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: token
      }
    }).as('request')
    cy.dobleClick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    const token = faker.datatype.uuid()
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: token
      }
    }).as('request')
    cy.findByPlaceholderText(/email/i)
    .type('teste@teste.com').type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})