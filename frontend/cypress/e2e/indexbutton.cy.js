// Arrange, Act, Assert

describe('Index page test', () => {
  it('Starts up the index page', () => {
    cy.visit('http://localhost:8888/stuwe1/frontend/')
  })

  it('should display the "Explore Now" button and if clickable', () => {
    // Is the button visible?
    cy.get('button').contains('Explore now').should('be.visible');

    // Can I click on the button and will the login-page open up?
    cy.contains('Explore now').click();
    cy.url().should('include', '/login');
  });

})