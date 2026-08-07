import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserImage } from './user-image.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  keycloakId!: string;

  @Field()
  displayName!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  dateOfBirth!: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  profileImageUrl?: string;

  @Field(() => [UserImage], {
    nullable: true,
  })
  image?: UserImage[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
