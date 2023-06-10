import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.development') });

const configEnvSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3900).required(),
    MONGO_URI: Joi.string().required().description('Mongo Uri'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_EXPIRE: Joi.string().default('7d').required().description('Days after which jwt expire'),
  })
  .unknown();

const { value: configEnv, error } = configEnvSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default configEnv;

