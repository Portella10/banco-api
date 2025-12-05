Cypress.Commands.add("transferencia", () => {
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
                contaOrigem: 1,
                contaDestino: 2,
                valor: 10,
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
Cypress.Commands.add("transferenciaSemToken", () => {
    return cy.login().then((response) => {
        const token = response.body.token;

        return cy.request({
            method: "POST",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                contaOrigem: 1,
                contaDestino: 2,
                valor: 10,
            },
        });
    });
});
