import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './index';
export const DRIZZLE_DB = 'DRIZZLE_DB';
export type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not defined');
        }
        const pool = new Pool({
          connectionString: databaseUrl,
        });
        return drizzle(pool);
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DatabaseModule {}
