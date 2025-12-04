import { validateSchema } from "./validateSchema";

export function validarErro(response, statusEsperado, schema, mensagemEsperada) {
    expect(response.status).to.equal(statusEsperado);
    validateSchema(schema, response.body);
    expect(response.body.error).to.equal(mensagemEsperada);
}
