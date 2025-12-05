export const transferenciasListSchema = {
    $id: "transderenciaListSchema",
    type: "object",
    required: ["page", "limit", "total", "transferencias"],
    properties: {
        page: { type: "integer", minimum: 1 },
        limit: { type: "integer", minimum: 1 },
        total: { type: "integer", minimum: 0 },

        transferencias: {
            type: "array",
            items: {
                type: "object",
                required: ["id", "conta_origem_id", "conta_destino_id", "valor", "data_hora", "autenticada", "titular_origem", "titular_destino"],
                properties: {
                    id: { type: "integer", minimum: 1 },
                    conta_origem_id: { type: "integer", minimum: 1 },
                    conta_destino_id: { type: "integer", minimum: 1 },

                    valor: { type: "string", pattern: "^[0-9]+(\\.[0-9]{2})?$" },

                    data_hora: {
                        type: "string",
                        pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
                    },

                    autenticada: { type: "integer", enum: [0, 1] },

                    titular_origem: { type: "string", minLength: 1 },
                    titular_destino: { type: "string", minLength: 1 },
                },
                additionalProperties: false,
            },
        },
    },
    additionalProperties: false,
};
export const transferenciaUnicaSchema = {
    $id: "transferenciaUnicaSchema",
    type: "object",
    required: ["id", "conta_origem_id", "conta_destino_id", "valor", "data_hora", "autenticada"],
    properties: {
        id: { type: "number" },

        conta_origem_id: { type: "number" },

        conta_destino_id: { type: "number" },

        valor: {
            type: "string",
            pattern: "^[0-9]+\\.[0-9]{2}$", // garante padrão 10.00
        },

        data_hora: {
            type: "string",
            pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
        },

        autenticada: {
            type: "number",
            enum: [0, 1], // só aceita 0 ou 1
        },
    },
    additionalProperties: false,
};

export const transferenciaListErrorSchema = {
    $id: "transferenciaErrorSchema",
    type: "object",
    required: ["error"],
    properties: {
        error: { type: "string" },
    },
    additionalProperties: false,
};
