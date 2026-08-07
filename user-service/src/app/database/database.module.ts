import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DRIZZLE_DB = 'DRIZZLE_DB';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL as string,
        });
        return drizzle(pool);
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DatabaseModule {}
