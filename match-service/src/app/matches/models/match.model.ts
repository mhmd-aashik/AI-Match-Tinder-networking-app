import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Match {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userOneId!: string;

  @Field(() => ID)
  userTwoId!: string;

  @Field()
  createdAt!: Date;
}
