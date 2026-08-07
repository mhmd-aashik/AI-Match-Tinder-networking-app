import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: './match-service/.env',
});

export default defineConfig({
  schema: './match-service/src/app/database/schema/*.ts',
  out: './match-service/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
