// Arrange, Act, Assert

describe("Song search flow test", () => {
  it("Starts up the login page", { tags: ["login", "critical"] }, () => {
    cy.visit("http://localhost:8888/login/");

    // Is the skip button visible?
    cy.contains("Skip").should("be.visible").click();

    // will I be forwarded to track-selection page?
    cy.url().should("include", "/track-selection");
  });
});
