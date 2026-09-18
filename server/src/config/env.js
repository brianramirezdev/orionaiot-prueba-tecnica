import dotenv from "dotenv";
import path from "node:path";

const env = process.env.NODE_ENV ?? "development";

dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const config = {
  env,
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "8h",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};

if (!config.jwtSecret) {
  throw new Error(`JWT_SECRET no está definido. Revisa .env.${env}`);
}
