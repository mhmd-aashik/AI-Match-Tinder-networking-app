import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSwipeInput {
  @Field(() => ID)
  targetUserId!: string;

  @Field()
  action!: string;
}
