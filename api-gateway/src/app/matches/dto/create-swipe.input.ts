import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SwipeAction {
  LIKE = 'like',
  PASS = 'pass',
}

registerEnumType(SwipeAction, {
  name: 'SwipeAction',
});

@InputType()
export class CreateSwipeInput {
  @Field()
  targetUserId!: string;

  @Field(() => SwipeAction)
  action!: SwipeAction;
}
