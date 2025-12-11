// GET por ID
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

// GET lista completa
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

// POST
Cypress.Commands.add("fazerTransferencia", (contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "POST",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: {
                contaOrigem: contaOrigem,
                contaDestino: contaDestino,
                valor: valor,
            },
        });
    });
});

// PUT (atualizar)
Cypress.Commands.add("atualizarTransferencia", (id, contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "PUT",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: {
                contaOrigem: contaOrigem,
                contaDestino: contaDestino,
                valor: valor,
            },
        });
    });
});

// DELETE
Cypress.Commands.add("DeletarTrasnferencia", (id) => {
    return cy.login().then((response) => {
        const token = response.body.token;
        cy.request({
            method: "DELETE",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    });
});
