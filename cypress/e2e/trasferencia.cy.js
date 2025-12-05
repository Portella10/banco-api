/// <reference types="cypress" />
import { transferenciaSchema, transferenciaErrorSchema } from "../schemas/transferencia";
import { validateSchema } from "../support/utils/validateSchema";
import { validarErro } from "../support/utils/validateError";
import { validar } from "../support/utils/validate";

describe("Transferencia - API Test", () => {
    it("Deve aparecer 201 com a tranferencia efetuada com dados corretos", () => {
        cy.transferencia().then((response) => {
            validar(response, 201, transferenciaSchema, "Transferência realizada com sucesso.");
            cy.log("✅ Transferencia concluida com sucesso, seguindo as regras de negocios");
        });
    });
    it("Deve retornar 404 com parâmetro contaOrigem vazio", () => {
        cy.transferenciaInvalida("POST", "", 2, 10).then((response) => {
            validarErro(response, 404, transferenciaErrorSchema, "Conta de origem ou destino não encontrada.");
            cy.log("✅ Validacao do erro 404 com sucesso");
        });
    });
    it("Deve dar erro 401 com a falta de autenticacao", () => {
        cy.transferenciaSemToken().then((response) => {
            validarErro(response, 401, transferenciaErrorSchema, "Token de autenticação não fornecido.");
            cy.log("✅ Validacao do erro 401 com sucesso");
        });
    });
    it("Deve retornar erro 405 com metodo nao permitodo", () => {
        cy.transferenciaInvalida("PUT", 1, 2, 10).then((response) => {
            validarErro(response, 405, transferenciaErrorSchema, "Método não permitido.");
            cy.log("✅ Validacao do erro 405 com sucesso");
        });
    });
    it("Deve retornar erro 422 validação de dados (saldo insuficiente, contas inativas)", () => {
        cy.transferenciaInvalida("POST", 6, 2, 10).then((response) => {
            const msg = response.body.error;

            const mensagensAceitas = [
                "O valor da transferência deve ser maior ou igual a R$10,00.",
                "Saldo insuficiente para realizar a transferência.",
                "Conta de origem ou destino está inativa.",
            ];

            expect(mensagensAceitas).to.include(msg);
            cy.log(`⚠️ Cenário validado: ${msg}`);
            expect(response.status).to.equal(422);
            validateSchema(transferenciaErrorSchema, response.body);
            cy.log("✅ Validacao do erro 422 com sucesso");
        });
    });
});
