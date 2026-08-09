import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from './message.model';
import { AiIcebreaker } from './ai-icebreaker.model';

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

  @Field(() => AiIcebreaker, {
    nullable: true,
  })
  icebreaker?: AiIcebreaker | null;
}
