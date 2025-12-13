/// <reference types="cypress" />

import { validarErroSemSchema } from "../../support/utils/validateError";

describe("Transferência - API Test | PUT", () => {
    it("Deve retornar status 204 ao atualizar todos os dados da transferência", () => {
        cy.listaId(10).then((before) => {
            cy.log(`Estado anterior da transferência: ${JSON.stringify(before.body)}`);

            cy.atualizarTransferencia(10, 1, 2, 20).then((putRes) => {
                expect(putRes.status).to.equal(204);
                cy.log(`Status retornado no PUT: ${putRes.status}`);
            });

            cy.listaId(10).then((after) => {
                cy.log(`Estado posterior da transferência: ${JSON.stringify(after.body)}`);
                expect(after.body.id).to.eq(before.body.id);
            });
        });
    });

    it("Deve retornar erro 401 ao tentar atualizar transferência sem token de autenticação", () => {
        cy.atualizarTransferenciaSemToken(1, 2, 3, 10).then((response) => {
            validarErroSemSchema(response, 401, "Token de autenticação não fornecido.");
        });
    });

    it("Deve retornar erro 404 ao tentar atualizar transferência inexistente", () => {
        cy.atualizarTransferenciaComIDInexistende(1000000, 2, 1, 10).then((response) => {
            validarErroSemSchema(response, 404, "Transferência não encontrada.");
        });
    });
});
