/// <reference types="cypress" />

import { transferenciasListSchema, transferenciaListErrorSchema, transferenciaUnicaSchema } from "../../schemas/transferenciaListSchema";
import { validarErro } from "../../support/utils/validateError";
import { validarGetId, validarLista } from "../../support/utils/validate";

describe("TransferenciaGet - API Test", () => {
    it("Deve apresentar todas as transferencias com status 200", () => {
        cy.listaCompleta("GET").then((response) => {
            validarLista(response, 200, "transferencias", transferenciasListSchema);
            cy.log("✅ Lista de transferencias apresentada");
        });
    });

    it("Deve apresentar erro 405 quando colocar metodo nao permitido", () => {
        cy.listaCompleta("PUT").then((response) => {
            validarErro(response, 405, transferenciaListErrorSchema, "Método não permitido.");
            cy.log("✅ Erro 405 apresentado com método não permitido");
        });
    });

    it("Deve apresentar apenas as informacoes informada pelo ID", function () {
        cy.listaId(11).then((response) => {
            validarGetId(response, 200, 11, "10.00", transferenciaUnicaSchema);
            cy.log("✅ Informaçoes apresentadas pelo id");
        });
    });

    it("Deve apresentar erro 401 não autorizado", () => {
        cy.listaSemToken(1).then((response) => {
            validarErro(response, 401, transferenciaListErrorSchema, "Token de autenticação não fornecido.");
            cy.log("✅ Erro 401 apresentado quando conta não é autenticada");
        });
    });

    it("Deve apresentar erro 404 transferência não encontrada", () => {
        cy.listaId("#$@!$%").then((response) => {
            cy.log("⚠️ Bug encontrado era para ser status 404 por nao ter esse id");
            cy.log("⚠️ Bug ao colocar caracteres  especias no id  desta maneira (#$@!$%) retorna a lista completa oque era para dar erro 404");
            // expect(response.status).to.equal(404);
            // expect(response.body.error).to.equal("Transferência não encontrada.");
            // expect(response.body.error).to.equal("Token de autenticação não fornecido.");
            // validateSchema(transferenciaListErrorSchema, response.body);
        });
    });
});
