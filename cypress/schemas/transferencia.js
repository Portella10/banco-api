export const transferenciaSchema = {
    $id: "transferenciaSchema",
    type: "object",
    required: ["message"],
    properties: {
        message: { type: "string" },
    },

    additionalProperties: false,
};

export const transferenciaErrorSchema = {
    $id: "transferenciaErrorSchema",
    type: "object",
    required: ["error"],
    properties: {
        error: { type: "string" },
    },
    additionalProperties: false,
};
