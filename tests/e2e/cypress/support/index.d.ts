///<reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to sign in
     * @example cy.signIn()
     */
     signIn(email?: string, password?: string ): Chainable<Element>

    /**
     * Custom command to doble click
     * @param email 
     * @param password 
     */
     dobleClick(email?: string, password?: string): Chainable<Element>

     /**
     * Custom command to sign up
     * @example cy.signUp(user)
     */
    signUp(name?: string, email?: string, password?: string): Chainable<Element>
  }
}