import { mount } from '@cypress/react' 
import App from './App'


describe('App', () => {
  it('should have working pause buttons', () => {
    mount(<App />)
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'paused')
    cy.get('[data-cy="end"]').should('not.exist')
    cy.get('[data-cy="start"]').should('be.visible')
    .click()
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'running')
    cy.get('[data-cy="end"]').should('be.visible')
    cy.get('[data-cy="start"]').should('not.exist')
  })


})