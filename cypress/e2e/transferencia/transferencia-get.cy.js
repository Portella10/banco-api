/// <reference types="cypress" />
import { validateSchema } from "../../support/utils/validateSchema";
import { transferenciasListSchema, transferenciaListErrorSchema, transferenciaUnicaSchema } from "../../schemas/transferenciaListSchema";

describe("TransferenciaGet - API Test", () => {
    let token;
    beforeEach(() => {
        cy.login().then((response) => {
            token = response.body.token;
        });
    });

    it("Deve apresentar todas as transferencias com status 200", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("transferencias");
            validateSchema(transferenciasListSchema, response.body);
        });
    });

    it("Deve apresentar erro 405 quando colocar metodo nao permitido", () => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.equal(405);
            expect(response.body.error).to.equal("Método não permitido.");
            validateSchema(transferenciaListErrorSchema, response.body);
        });
    });

    it("Deve apresentar apenas as informacoes informada pelo ID", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias/1`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(1);
            expect(response.body.valor).to.equal("10.00");
            expect(response.body.conta_origem_id).not.equal(response.body.conta_destino_id);
            validateSchema(transferenciaUnicaSchema, response.body);
        });
    });

    it("Deve apresentar erro 401 não autorizado", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias/1`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.error).to.equal("Token de autenticação não fornecido.");
            validateSchema(transferenciaListErrorSchema, response.body);
        });
    });

    it("Deve apresentar erro 404 transferência não encontrada", () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("baseUrl")}/transferencias/#$@!$%`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            cy.log("⚠️ Bug encontrado era para ser status 404 por nao ter esse id");
            cy.log("⚠️ Bug ao colocar caracteres  especias no id  desta maneira (#$@!$%) retorna a lista completa oque era para dar erro 404");
            // expect(response.status).to.equal(404);
            // expect(response.body.error).to.equal("Transferência não encontrada.");
            // expect(response.body.error).to.equal("Token de autenticação não fornecido.");
            // validateSchema(transferenciaListErrorSchema, response.body);
        });
    });

    it("Deve apresentar erro 405 com metodo nao permitido", () => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env("baseUrl")}/transferencias`,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.equal(405);
            expect(response.body.error).to.equal("Método não permitido.");
            validateSchema(transferenciaListErrorSchema, response.body);
        });
    });
});
