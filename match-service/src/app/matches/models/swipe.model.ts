import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Swipe {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  swiperUserId!: string;

  @Field(() => ID)
  targetUserId!: string;

  @Field()
  action!: string;

  @Field(() => Date)
  createdAt!: Date;
}
