/// <reference types="cypress" />

import { validarErroSemSchema } from "../../support/utils/validateError";

describe("Transferência - API Test | DELETE", () => {
    it("Deve retornar status 204 ao deletar uma transferência existente", () => {
        cy.log("Validando a existência da transferência antes da exclusão");

        cy.listaId(7).then((res) => {
            cy.log(`Transferência localizada: ${JSON.stringify(res.body)}`);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(res.body.id);
        });

        cy.DeletarTrasnferencia(8).then((delRes) => {
            cy.log(`Status retornado no DELETE: ${delRes.status}`);
            expect(delRes.status).to.equal(204);
        });
    });

    it("Deve retornar erro 401 ao tentar deletar transferência sem token de autenticação", () => {
        cy.DeletarTrasnferenciaSemToken(10).then((response) => {
            validarErroSemSchema(response, 401, "Token de autenticação não fornecido.");
        });
    });

    it("Deve retornar erro 404 ao tentar deletar transferência inexistente", () => {
        cy.DeletarTrasnferenciaComIdinexistende(10000000000000).then((response) => {
            validarErroSemSchema(response, 404, "Transferência não encontrada.");
        });
    });
});
