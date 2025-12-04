export const loginSchema = {
    $id: "loginSchema",
    type: "object",

    required: ["token"],

    properties: {
        token: {
            type: "string",
            minLength: 10,
            pattern: "^[A-Za-z0-9-._~+/]+=*$",
        },
    },

    additionalProperties: false,
};

export const loginErrorSchema = {
    $id: "loginErrorSchema",
    type: "object",
    required: ["error"],
    properties: {
        error: { type: "string" },
    },
    additionalProperties: false,
};
