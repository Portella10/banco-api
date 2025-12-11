Cypress.Commands.add("login", () => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("baseUrl")}/login`,
        headers: { "Content-Type": "application/json" },
        body: {
            username: Cypress.env("username"),
            senha: Cypress.env("password"),
        },
    });
});
