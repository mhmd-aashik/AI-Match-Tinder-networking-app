import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AiIcebreaker {
  @Field(() => ID)
  id!: string;

  @Field()
  content!: string;

  @Field()
  createdAt!: Date;
}