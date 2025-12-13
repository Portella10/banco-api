/// <reference types="cypress" />
import { transferenciaSchema, transferenciaErrorSchema } from "../../schemas/transferenciaPost";
import { validateSchema } from "../../support/utils/validateSchema";
import { validarErro } from "../../support/utils/validateError";
import { validar } from "../../support/utils/validate";

describe("Transferência - API Test | POST", () => {
    it("Deve retornar status 201 ao realizar transferência com dados válidos", () => {
        cy.fazerTransferencia(1, 2, 10).then((response) => {
            validar(response, 201, transferenciaSchema, "Transferência realizada com sucesso.");
            cy.log("Transferência concluída com sucesso, respeitando as regras de negócio");
        });
    });

    it("Deve retornar erro 404 ao informar conta de origem vazia", () => {
        cy.fazerTransferencia("", 2, 10).then((response) => {
            validarErro(response, 404, transferenciaErrorSchema, "Conta de origem ou destino não encontrada.");
            cy.log("Validação do erro 404 realizada com sucesso");
        });
    });

    it("Deve retornar erro 401 ao realizar transferência sem autenticação", () => {
        cy.fazerTransferenciaSemToken().then((response) => {
            validarErro(response, 401, transferenciaErrorSchema, "Token de autenticação não fornecido.");
            cy.log("Validação do erro 401 realizada com sucesso");
        });
    });

    it("Deve retornar erro 405 ao utilizar método HTTP não permitido", () => {
        cy.fazerTransferenciaComMethodErrado(1, 2, 10).then((response) => {
            validarErro(response, 405, transferenciaErrorSchema, "Método não permitido.");
            cy.log("Validação do erro 405 realizada com sucesso");
        });
    });

    it("Deve retornar erro 422 ao violar regras de validação de negócio", () => {
        cy.fazerTransferenciaInvalida(6, 2, 10).then((response) => {
            const msg = response.body.error;

            const mensagensAceitas = [
                "O valor da transferência deve ser maior ou igual a R$10,00.",
                "Saldo insuficiente para realizar a transferência.",
                "Conta de origem ou destino está inativa.",
            ];

            expect(mensagensAceitas).to.include(msg);
            cy.log(`Cenário de validação retornado: ${msg}`);
            expect(response.status).to.equal(422);
            validateSchema(transferenciaErrorSchema, response.body);
            cy.log("Validação do erro 422 realizada com sucesso");
        });
    });
});
