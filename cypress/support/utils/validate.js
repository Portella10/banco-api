import { validateSchema } from "./validateSchema";

export function validar(response, statusEsperado, schema, mensagemEsperada) {
    expect(response.status).to.equal(statusEsperado);
    validateSchema(schema, response.body);
    expect(response.body.message).to.equal(mensagemEsperada);
}
