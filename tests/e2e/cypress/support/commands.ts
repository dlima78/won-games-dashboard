// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add teting library commands
import faker from '@faker-js/faker';
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('signIn', (email = faker.internet.email(), password = faker.internet.password()) => {
  cy.findAllByPlaceholderText(/email/i).type(email).blur()
  cy.findAllByPlaceholderText(/senha/i).type(password).blur()
  cy.findByRole('button', { name: /entrar/i }).click()
})

Cypress.Commands.add('dobleClick', (email = faker.internet.email(), password = faker.internet.password()) => {
  cy.findAllByPlaceholderText(/email/i).type(email).blur()
  cy.findAllByPlaceholderText(/senha/i).type(password).blur()
  cy.findByRole('button', { name: /entrar/i }).dblclick()
})

Cypress.Commands.add('signUp', (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  cy.findByPlaceholderText(/nome/i)
    .type(name)
    .blur()
    cy.findByPlaceholderText(/email/i)
    .type(email)
    .blur()
    cy.findByPlaceholderText('Senha')
    .type(password)
    .blur()
    cy.findByPlaceholderText(/confirme a senha/i)
    .type(password)
    .blur()
    cy.findByRole('button', { name: /cadastrar/i}).click()
})
