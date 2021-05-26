import { mount } from '@cypress/react' 
import Spinner from './Spinner'

const transferAmountPerSecond = 30;
const fileSize = 1000;

describe('Spinner', () => {
  it('should render correctly if it is paused', () => {
    mount(<Spinner pauseSpinner={true} fileSize={fileSize} transferAmountPerSecond={transferAmountPerSecond} />)
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'paused')
    cy.get('[data-cy=label]').should('have.text', 'Paused')
    cy.get('[data-cy=percent-transfer]').should('have.text', '0%')
    cy.get('[data-cy=progress-fill]').should('have.css', 'stroke-dashoffset', '245px')
  })

  it('should render correctly if it is not paused', () => {
    mount(<Spinner pauseSpinner={false} fileSize={fileSize} transferAmountPerSecond={transferAmountPerSecond} />)
    cy.get('[data-cy=spinner-svg]').should('be.visible').and('have.css', 'animation-play-state', 'running')
    cy.get('[data-cy=label]').should('have.text', 'Transferring')
    cy.get('[data-cy=percent-transfer]').should('not.have.text', '0%')
    cy.get('[data-cy=progress-fill]').should('not.have.css', 'stroke-dashoffset', '245px') 
  })


  it("should display correct percentage", () => {
    cy.clock()
    mount(<Spinner pauseSpinner={false} fileSize={fileSize} transferAmountPerSecond={transferAmountPerSecond} />)
    cy.tick(1000 * 5)
    // buffer time needed to account for extra time for DOM updates 
    const bufferTimeMultiplier = 2;
    const percentageDownloaded = Math.floor(((transferAmountPerSecond * (5-bufferTimeMultiplier)/fileSize) * 100))
    cy.get('[data-cy=percent-transfer]').should('include.text', percentageDownloaded)
  }) 

})