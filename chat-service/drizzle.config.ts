import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: './chat-service/.env',
});

export default defineConfig({
  schema: './chat-service/src/app/database/schema/*.ts',
  out: './chat-service/drizzle',
  dialect: 'postgresql',

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
