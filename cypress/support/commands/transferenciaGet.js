Cypress.Commands.add("listaCompleta", (method) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: method,
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    });
});
Cypress.Commands.add("listaCompletaErro", () => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    });
});
Cypress.Commands.add("listaId", (id) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    });
});
Cypress.Commands.add("listaSemToken", (id) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
});
