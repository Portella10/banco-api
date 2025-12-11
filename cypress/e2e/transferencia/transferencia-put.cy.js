/// <reference types="cypress" />

describe("TrasferenciaPut - Api Test", () => {
    it("Deve apresentar status 204 quando solicitado atualizacao de todos os dados da transferencia", () => {
        cy.listaId(10).then((before) => {
            cy.log(`Before: ${JSON.stringify(before.body)}`);
            cy.atualizarTransferencia(10, 4, 1, 20).then((putRes) => {
                expect(putRes.status).to.equal(204);
                cy.log(`PUT Response: ${putRes.status}`);
            });
            cy.listaId(10).then((after) => {
                cy.log(`After: ${JSON.stringify(after.body)}`);
                expect(after.body.id).to.eq(before.body.id);
            });
        });
    });
    it("Deve apresentar um erro quando o token nao e informado", () => {
        cy.atualizarTransferenciaSemToken(1, 2, 3, 10).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.error).to.equal("Token de autenticação não fornecido.");
        });
    });
    it("Deve apressentar erro quando nao encontrar a transferencia", () => {
        cy.atualizarTransferenciaComIDInexistende(1000000, 2, 1, 10).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Transferência não encontrada.");
        });
    });
});
