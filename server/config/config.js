import Joi from "joi";
import dotenv from "dotenv";
import path from "path";

// dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: "./.env" });

const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string().valid("production", "development", "test").required(),
	PORT: Joi.number().default(8080),
	HOST: Joi.string().required().description("Host is required").default("127.0.0.1"),
	DB_LOCAL: Joi.string().required().description("MongoDB URL"),
	DB_REMOTE: Joi.string().description("MongoDB Remote URL"),
	DB_REMOTE_USERNAME: Joi.string().description("MongoDB server username").required(),
	DB_REMOTE_PASSWORD: Joi.string().description("The password for MongoDB server (Remote)").required(),

	JWT_SECRETE: Joi.string().required().description("JWT secret kye"),
	JWT_EXPIRES_IN: Joi.string().required().description("JWT expiration time"),

	SMTP_EMAIL_USERNAME: Joi.string().required().description("SMTP username"),
	SMTP_EMAIL_PASSWORD: Joi.string().required().description("SMTP password"),
	SMTP_EMAIL_HOST: Joi.string().required().description("SMTP host").default("sandbox.smtp.mailtrap.io"),
	SMTP_EMAIL_PORT: Joi.number().required().description("SMTP port"),
}).unknown();

// const { value, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

const { value, error } = envVarsSchema.validate(process.env, {
	errors: { label: "key" },
	abortEarly: false, //Instead of stopping at the first validation error, it collects all errors and reports them together.
	allowUnknown: true, // Allows extra environment variables not listed in your schema.
	stripUnknown: true, // Removes any keys that are not defined in your schema from the validated output.
});

if (error) {
	console.error(`Config validation error: ${error.message}`);
	process.exit(1);
}

export default {
	env: value.NODE_ENV,
	port: value.PORT,
	host: value.HOST,
	mongoose: {
		URLLocal: value.DB_LOCAL,
		URLRemote: value.DB_REMOTE,
		REMOTE_DB_PASSWORD: value.REMOTE_DB_PASSWORD,
		REMOTE_DB_USERNAME: value.REMOTE_DB_USERNAME,
	},
	jwt: {
		secrete: value.JWT_SECRETE,
		expires: value.JWT_EXPIRES_IN,
	},
	email: {
		smtp: {
			host: value.SMTP_EMAIL_HOST,
			port: value.SMTP_EMAIL_PORT,
			username: value.SMTP_EMAIL_USERNAME,
			password: value.SMTP_EMAIL_PASSWORD,
		},
	},
};
