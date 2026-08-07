import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  displayName!: string;

  @Field({ nullable: true })
  bio?: string;
}
