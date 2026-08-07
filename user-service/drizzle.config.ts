import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: './user-service/.env',
});

export default defineConfig({
  schema: './user-service/src/app/database/schema/*.ts',
  out: './user-service/drizzle',

  dialect: 'postgresql',

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
