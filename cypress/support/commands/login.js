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
Cypress.Commands.add("loginInvalido", (method, username, password) => {
    cy.request({
        method: method,
        url: `${Cypress.env("baseUrl")}/login`,
        failOnStatusCode: false,
        headers: { "Content-Type": "application/json" },
        body: {
            username: username,
            senha: password,
        },
    });
});
