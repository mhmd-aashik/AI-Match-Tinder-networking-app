import { Field, ObjectType } from '@nestjs/graphql';

import { Match } from './match.model';
import { Swipe } from './swipe.model';

@ObjectType()
export class SwipeResult {
  @Field(() => Swipe)
  swipe!: Swipe;

  @Field(() => Match, { nullable: true })
  match?: Match | null;
}
