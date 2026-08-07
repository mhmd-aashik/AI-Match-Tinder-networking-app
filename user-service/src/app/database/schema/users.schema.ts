import {
  date,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  keycloakId: varchar('keycloak_id', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  bio: text('bio'),
  dateOfBirth: date('date_of_birth').notNull(),
  gender: varchar('gender', { length: 30 }),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
