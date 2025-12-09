import { validateSchema } from "./validateSchema";

export function validar(response, statusEsperado, schema, mensagemEsperada) {
    expect(response.status).to.equal(statusEsperado);
    validateSchema(schema, response.body);
    expect(response.body.message).to.equal(mensagemEsperada);
}
export function validarGetId(response, statusEsperado, id, valor, schema) {
    expect(response.status).to.equal(statusEsperado);
    expect(response.body.id).to.equal(id);
    expect(response.body.valor).to.equal(valor);
    expect(response.body.conta_origem_id).not.equal(response.body.conta_destino_id);
    validateSchema(schema, response.body);
}
export function validarLista(response, statusEsperado, property, schema) {
    expect(response.status).to.equal(statusEsperado);
    expect(response.body).to.have.property(property);
    validateSchema(schema, response.body);
}
