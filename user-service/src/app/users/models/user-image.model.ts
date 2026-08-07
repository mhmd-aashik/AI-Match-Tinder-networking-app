import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

ObjectType();
export class UserImage {
  @Field(() => ID)
  id!: string;

  @Field()
  imageUrl!: string;

  @Field(() => Int)
  position!: number;

  @Field()
  createdAt!: Date;
}
