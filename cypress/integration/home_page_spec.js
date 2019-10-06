beforeEach(() => {
  cy.visit('/');
  cy.injectAxe();
});

describe('The Home Page', () => {
  it('has "The Daily Dietitian" in the title', () => {
    cy.title().should('contain', 'The Daily Dietitian');
  });

  it('passes a11y tests', () => {
    cy.checkA11y();
  });

  it('matches the image snapshot', () => {
    cy.matchImageSnapshot();
  });
});
