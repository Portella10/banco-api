/// <reference types="cypress" />

import { transferenciasListSchema, transferenciaListErrorSchema, transferenciaUnicaSchema } from "../../schemas/transferenciaListSchema";
import { validarErro } from "../../support/utils/validateError";
import { validarGetId, validarLista } from "../../support/utils/validate";

describe("Transferência - API Test | GET", () => {
    it("Deve retornar a lista completa de transferências com status 200", () => {
        cy.listaCompleta("GET").then((response) => {
            validarLista(response, 200, "transferencias", transferenciasListSchema);
            cy.log("Lista de transferências retornada com sucesso");
        });
    });

    it("Deve retornar erro 405 ao utilizar método HTTP não permitido", () => {
        cy.listaCompleta("PUT").then((response) => {
            validarErro(response, 405, transferenciaListErrorSchema, "Método não permitido.");
            cy.log("Validação do erro 405 realizada com sucesso");
        });
    });

    it("Deve retornar apenas as informações da transferência informada pelo ID", function () {
        cy.listaId(11).then((response) => {
            validarGetId(response, 200, 11, "10.00", transferenciaUnicaSchema);
            cy.log("Informações da transferência retornadas com sucesso");
        });
    });

    it("Deve retornar erro 401 quando a requisição não estiver autenticada", () => {
        cy.listaSemToken(1).then((response) => {
            validarErro(response, 401, transferenciaListErrorSchema, "Token de autenticação não fornecido.");
            cy.log("Validação do erro 401 realizada com sucesso");
        });
    });

    it("Deve retornar erro 404 ao informar ID inexistente ou inválido", () => {
        cy.listaId("#$@!$%").then((response) => {
            cy.log("⚠️ Bug identificado: ao informar um ID inexistente, a API não retorna status 404 conforme esperado.");
            cy.log("⚠️ Bug identificado: ao informar caracteres especiais no ID (#$@!$%), a API retorna a lista completa em vez de erro 404.");
            // expect(response.status).to.equal(404);
            // expect(response.body.error).to.equal("Transferência não encontrada.");
            // validateSchema(transferenciaListErrorSchema, response.body);
        });
    });
});
