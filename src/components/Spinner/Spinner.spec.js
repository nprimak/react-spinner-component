import { mount } from '@cypress/react' 
import Spinner from './Spinner'

describe('Spinner', () => {
  it('Spinner with pauseSpinner=true should render correctly', () => {
    mount(<Spinner pauseSpinner={true} fileSize={1000} />)
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'paused')
    cy.get('[data-cy=label]').should('have.text', 'Paused')
    cy.get('[data-cy=percent-transfer]').should('have.text', '0%')
    cy.get('[data-cy=progress-fill]').should('have.css', 'stroke-dashoffset', '245px')
  })

  it('Spinner with pauseSpinner=false should render correctly', () => {
    mount(<Spinner pauseSpinner={false} fileSize={1000} />)
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'running')
    cy.get('[data-cy=label]').should('have.text', 'Transferring')
    cy.get('[data-cy=percent-transfer]').should('not.have.text', '0%')
    cy.get('[data-cy=progress-fill]').should('not.have.css', 'stroke-dashoffset', '245px')
  })

})