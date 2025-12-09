/// <reference types="cypress" />

describe("TrasferenciaPut - Api Test", () => {
    it("Deve apresentar status 204 quando solicitado atualizacao de todos os dados da transferencia", () => {
        cy.listaId(2).then((before) => {
            cy.transferencia("PUT", 2, 3, 4, 50).then((putRes) => {
                expect(putRes.status).to.equal(204);
            });
            cy.listaId(2).then((after) => {
                expect(after.body.valor).to.not.eq(before.body.valor);
                expect(after.body.id).to.eq(before.body.id);
            });
        });
    });
    it("Deve apresentar um erro quando o token nao e informado", () => {
        cy.transferenciaSemToken("PUT", 1, 2, 3, 10).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.error).to.equal("Token de autenticação não fornecido.");
        });
    });
    it.only("Deve apressentar erro quando nao encontrar a transferencia", () => {
        cy.transferencia("PUT", 1000000, 2, 1, 10).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Transferência não encontrada.");
        });
    });
});
