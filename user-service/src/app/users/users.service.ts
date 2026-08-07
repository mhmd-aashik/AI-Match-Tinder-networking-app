import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { userImages, users } from '../database';
import { eq } from 'drizzle-orm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserImageInput } from './dto/create-user-image.input';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.drizzleDb.select().from(users).limit(limit).offset(offset);
  }

  async findById(id: string) {
    const [user] = await this.drizzleDb
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(keycloakId: string, input: CreateUserInput) {
    const result = await this.drizzleDb
      .insert(users)
      .values({ ...input, keycloakId })
      .returning();

    return result[0];
  }

  async update(id: string, input: UpdateUserInput) {
    const [user] = await this.drizzleDb
      .update(users)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string) {
    const [user] = await this.drizzleDb
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findImagesByUserId(userId: string) {
    return this.drizzleDb
      .select()
      .from(userImages)
      .where(eq(userImages.userId, userId));
  }

  async addImage(userId: string, input: CreateUserImageInput) {
    const [image] = await this.drizzleDb
      .insert(userImages)
      .values({
        userId,
        ...input,
      })
      .returning();

    return image;
  }

  async findByKeycloakId(keycloakId: string) {
    const [user] = await this.drizzleDb
      .select()
      .from(users)
      .where(eq(users.keycloakId, keycloakId));

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    return user;
  }
}
