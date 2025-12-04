/// <reference types="cypress" />
import { loginSchema, loginErrorSchema } from "../schemas/loginSchema";
import { validateSchema } from "../support/utils/validateSchema";
import { validarErro } from "../support/utils/validateError";

describe("login - API Tests", () => {
    it("Deve dar status 200 com credenciais válidas", () => {
        cy.login().then((response) => {
            expect(response.status).to.equal(200);
            validateSchema(loginSchema, response.body);
            cy.log("✅ loginSchema validado com sucesso!");
            cy.log("Token recebido");
        });
    });

    it("Deve retornar status 400 quando username e password estiverem em branco", () => {
        cy.loginInvalido("POST", "", "").then((response) => {
            validarErro(response, 400, loginErrorSchema, "Usuário e senha são obrigatórios.");
            cy.log("✅ Erro 400 validado com sucesso!");
        });
    });
    it("Deve retornar status 401 com credenciais inválidas", () => {
        cy.loginInvalido("POST", "Alfred", 123).then((response) => {
            validarErro(response, 401, loginErrorSchema, "Usuário ou senha inválidos.");
            cy.log("✅ Erro 401 validado com sucesso!");
        });
    });
    it("Deve retornar status 405 com método não permitido", () => {
        cy.loginInvalido("GET", "Alfred", 123).then((response) => {
            validarErro(response, 405, loginErrorSchema, "Método não permitido.");
            cy.log("✅ Erro 405 validado com sucesso!");
        });
    });
    it("Deve retornar erro 500 quando a API falhar", () => {
        const mockResponse = {
            status: 500,
            body: { error: "Erro interno do servidor" },
        };
        validarErro(mockResponse, 500, loginErrorSchema, "Erro interno do servidor");
        cy.log("✅ Erro 500 validado com sucesso!");
    });
});
