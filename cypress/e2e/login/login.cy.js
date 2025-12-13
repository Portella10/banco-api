/// <reference types="cypress" />
import { loginSchema, loginErrorSchema } from "../../schemas/loginSchema";
import { validateSchema } from "../../support/utils/validateSchema";
import { validarErro } from "../../support/utils/validateError";
import { validar } from "../../support/utils/validate";

describe("Login - API Test", () => {
    it("Deve retornar status 200 ao realizar login com credenciais válidas", () => {
        cy.login().then((response) => {
            expect(response.status).to.equal(200);
            validateSchema(loginSchema, response.body);
            cy.log("✅ Schema de login validado com sucesso");
            cy.log("Token de autenticação recebido");
        });
    });

    it("Deve retornar status 400 ao informar usuário e senha em branco", () => {
        cy.loginInvalido("POST", "", "").then((response) => {
            validarErro(response, 400, loginErrorSchema, "Usuário e senha são obrigatórios.");
            cy.log("✅ Validação do erro 400 realizada com sucesso");
        });
    });

    it("Deve retornar status 401 ao informar credenciais inválidas", () => {
        cy.loginInvalido("POST", "Alfred", 123).then((response) => {
            validarErro(response, 401, loginErrorSchema, "Usuário ou senha inválidos.");
            cy.log("✅ Validação do erro 401 realizada com sucesso");
        });
    });

    it("Deve retornar status 405 ao utilizar método HTTP não permitido", () => {
        cy.loginInvalido("GET", "Alfred", 123).then((response) => {
            validarErro(response, 405, loginErrorSchema, "Método não permitido.");
            cy.log("✅ Validação do erro 405 realizada com sucesso");
        });
    });

    it("Deve retornar status 500 quando ocorrer falha interna na API", () => {
        const mockResponse = {
            status: 500,
            body: { error: "Erro interno do servidor" },
        };

        validarErro(mockResponse, 500, loginErrorSchema, "Erro interno do servidor");
        cy.log("✅ Validação do erro 500 realizada com sucesso");
    });
});
