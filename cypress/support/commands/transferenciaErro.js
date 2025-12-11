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

Cypress.Commands.add("listaSemToken", (id) => {
    return cy.login().then((response) => {
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

Cypress.Commands.add("fazerTransferenciaInvalida", (contaOrigem, contaDestino, valor) => {
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

Cypress.Commands.add("fazerTransferenciaSemToken", (contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        return cy.request({
            method: "POST",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                contaOrigem: contaOrigem,
                contaDestino: contaDestino,
                valor: valor,
            },
        });
    });
});
Cypress.Commands.add("fazerTransferenciaComMethodErrado", (contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "PUT",
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
Cypress.Commands.add("atualizarTransferenciaSemToken", (id, contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        return cy.request({
            method: "PUT",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                contaOrigem: contaOrigem,
                contaDestino: contaDestino,
                valor: valor,
            },
        });
    });
});
Cypress.Commands.add("atualizarTransferenciaComIDInexistende", (id, contaOrigem, contaDestino, valor) => {
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

Cypress.Commands.add("DeletarTrasnferenciaSemToken", (id) => {
    return cy.login().then((response) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env("baseUrl")}/transferencias/${id}`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
});
Cypress.Commands.add("DeletarTrasnferenciaComIdinexistende", (id) => {
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
