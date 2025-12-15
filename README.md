# Banco API - Testes E2E

Este projeto contém uma suíte de testes end-to-end (E2E) desenvolvida com Cypress para validar a funcionalidade da API de banco disponível em [https://github.com/juliodelimas/banco-api](https://github.com/juliodelimas/banco-api). A API utiliza um banco de dados para gerenciar operações como contas bancárias e transferências.

## Funcionalidades Testadas

-   **Login**: Autenticação de usuários.
-   **Contas (Conta)**: Operações relacionadas à gestão de contas bancárias.
-   **Transferências**: Testes para operações GET, POST, PUT e DELETE de transferências.

## Pré-requisitos

-   Node.js (versão 14 ou superior)
-   npm ou yarn
-   A API [banco-api](https://github.com/juliodelimas/banco-api) deve estar rodando localmente ou acessível via URL configurada.
-   Instruções para configurar o banco de dados estão disponíveis no repositório da API: [https://github.com/juliodelimas/banco-api](https://github.com/juliodelimas/banco-api).

## Instalação

1. Clone este repositório:

    ```bash
    git clone <URL-do-repositório>
    cd banco-api
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o ambiente:
    - Edite o arquivo `cypress.env.json` para definir variáveis de ambiente, como a URL base da API (ex.: `baseUrl`).

## Executando os Testes

Siga os passos abaixo para executar os testes E2E:

1. Certifique-se de que a API [banco-api](https://github.com/juliodelimas/banco-api) está em execução e acessível.

2. Abra o Cypress em modo interativo para visualizar e executar os testes:

    ```bash
    npx cypress open
    ```

    - Selecione os testes desejados na interface do Cypress e execute-os.

3. Para executar os testes em modo headless (sem interface gráfica, ideal para CI/CD):

    ```bash
    npx cypress run
    ```

4. Os testes estão organizados em pastas dentro de `cypress/e2e/`:
    - `login/`: Testes de autenticação.
    - `conta/`: Testes de contas.
    - `transferencia/`: Testes de transferências (GET, POST, PUT, DELETE).

## Relatórios

Este projeto utiliza o Mockwesome para geração de relatórios de testes. Após a execução dos testes:

-   Verifique o relatório HTML em `cypress/reports/html/index.html`.
-   Abra o arquivo no navegador para visualizar os resultados detalhados, incluindo capturas de tela e logs de falhas.

Para gerar relatórios automaticamente em pipelines de CI/CD, configure o comando de execução com flags apropriadas do Cypress.

## Estrutura do Projeto

-   `cypress/e2e/`: Arquivos de testes E2E.
-   `cypress/fixtures/`: Dados de exemplo para testes.
-   `cypress/schemas/`: Esquemas JSON para validação de respostas da API.
-   `cypress/support/`: Comandos customizados e utilitários para testes.
-   `cypress.config.js`: Configuração do Cypress.
-   `package.json`: Dependências e scripts do projeto.

## Contribuição

Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações.
3. Adicione testes para novas funcionalidades.
4. Execute os testes e verifique os relatórios.
5. Envie um pull request.
