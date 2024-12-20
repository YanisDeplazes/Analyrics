// Arrange, Act, Assert

describe("Login flow test", () => {
  it("Starts up the index page", { tags: ["login", "critical"] }, () => {
    cy.visit("http://localhost:8888/");

    // Is the button visible?
    cy.get("button").contains("Explore now").should("be.visible");

    // Can I click on the button and will the login-page open up?
    cy.contains("Explore now").click();
    cy.url().should("include", "/login");
  });
});
