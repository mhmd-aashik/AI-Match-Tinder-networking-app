import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
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
}
