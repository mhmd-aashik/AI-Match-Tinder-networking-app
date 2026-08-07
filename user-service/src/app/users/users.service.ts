import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  async findAll() {
    return this.drizzleDb.select().from(users);
  }

  async findById(id: string) {
    const [user] = await this.drizzleDb
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user;
  }
}
