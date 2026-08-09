import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  senderUserId!: string;

  @Field()
  content!: string;

  @Field()
  createdAt!: Date;
}
