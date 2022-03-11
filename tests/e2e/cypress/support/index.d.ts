///<reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to fields By Placeholder
     * @example cy.google()
     */
     signIn(email?: string, password?: string ): Chainable<Element>

    /**
     * Custom command to doble click
     * @param email 
     * @param password 
     */
     dobleClick(email?: string, password?: string): Chainable<Element>
  }
}