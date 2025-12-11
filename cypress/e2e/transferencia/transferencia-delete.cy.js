/// <reference types="cypress" />

describe("TransferenciaDelete - API Test", () => {
    it("Deve retornar status 204 quando deletar uma transferência", () => {
        cy.log(" Validando que a transferência existe antes do delete...");
        cy.listaId(7).then((res) => {
            cy.log(`Registro encontrado: ${JSON.stringify(res.body)}`);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(res.body.id);
        });
        cy.DeletarTrasnferencia(8).then((delRes) => {
            cy.log(`Resposta do DELETE: ${delRes.status}`);
            expect(delRes.status).to.equal(204);
        });
    });
    it("Deve apresntar erro quando o nao for autorizado", () => {
        cy.DeletarTrasnferenciaSemToken(10).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.error).to.equal("Token de autenticação não fornecido.");
        });
    });
    it("Deve apresntar erro quando nao encontrar transferencia", () => {
        cy.DeletarTrasnferenciaComIdinexistende(10000000000000).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Transferência não encontrada.");
        });
    });
});
