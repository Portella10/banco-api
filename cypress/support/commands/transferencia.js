Cypress.Commands.add("transferencia", (method, id, contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: method,
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
Cypress.Commands.add("transferenciaInvalida", (method, contaOrigem, contaDestino, valor) => {
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
            body: {
                contaOrigem: contaOrigem,
                contaDestino: contaDestino,
                valor: valor,
            },
        });
    });
});
Cypress.Commands.add("transferenciaSemToken", (method, id, contaOrigem, contaDestino, valor) => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: method,
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
