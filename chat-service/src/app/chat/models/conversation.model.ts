import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from './message.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  matchId!: string;

  @Field(() => ID)
  userOneId!: string;

  @Field(() => ID)
  userTwoId!: string;

  @Field()
  createdAt!: Date;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}
