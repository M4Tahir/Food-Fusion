import Joi from 'joi';

// Define schema for Vite env vars
// As vite run 
export const envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),

    VITE_API_URL: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required()
        .label('Backend API URL')
        .description('The full base URL of your backend API, e.g. http://127.0.0.1:8080/api/v1'),

    VITE_CLIENT_ORIGIN: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required()
        .label('Frontend Origin')
        .description('The frontend base URL used for CORS'),
}).unknown();

const { value, error } = envSchema.validate(import.meta.env, {
    errors: { label: 'key' },
    abortEarly: false,//Instead of stopping at the first validation error, it collects all errors and reports them together.
    allowUnknown: true, // Allows extra environment variables not listed in your schema.
    stripUnknown: true, // Removes any keys that are not defined in your schema from the validated output.
});

if (error) {
    throw new Error(`Env validation error:\n${error.message}`);
}

export default {
    nodeEnv: value.NODE_ENV,
    backend: {
        apiUrl: value.VITE_API_URL,
        clientOrigin: value.VITE_CLIENT_ORIGIN,
    },
};
