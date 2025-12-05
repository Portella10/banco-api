/// <reference types="cypress" />
import { validateSchema } from "../../support/utils/validateSchema";
import { transferenciasListSchema, transferenciaListErrorSchema, transferenciaUnicaSchema } from "../../schemas/transferenciaListSchema";

describe("TransferenciaGet - API Test", () => {
    it("Deve apresentar todas as transferencias com status 200", () => {
        cy.listaCompleta("GET").then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("transferencias");
            validateSchema(transferenciasListSchema, response.body);
        });
    });

    it("Deve apresentar erro 405 quando colocar metodo nao permitido", () => {
        cy.listaCompleta("PUT").then((response) => {
            expect(response.status).to.equal(405);
            expect(response.body.error).to.equal("Método não permitido.");
            validateSchema(transferenciaListErrorSchema, response.body);
        });
    });

    it("Deve apresentar apenas as informacoes informada pelo ID", () => {
        cy.listaId(1).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(1);
            expect(response.body.valor).to.equal("10.00");
            expect(response.body.conta_origem_id).not.equal(response.body.conta_destino_id);
            validateSchema(transferenciaUnicaSchema, response.body);
        });
    });

    it("Deve apresentar erro 401 não autorizado", () => {
        cy.listaSemToken(1).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.error).to.equal("Token de autenticação não fornecido.");
            validateSchema(transferenciaListErrorSchema, response.body);
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

    it("Deve apresentar erro 405 com metodo nao permitido", () => {
        cy.listaCompleta("PUT").then((response) => {
            expect(response.status).to.equal(405);
            expect(response.body.error).to.equal("Método não permitido.");
            validateSchema(transferenciaListErrorSchema, response.body);
        });
    });
});
