import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        throw new Error("Schema validation failed: " + JSON.stringify(validate.errors));
    }

    return true;
}
