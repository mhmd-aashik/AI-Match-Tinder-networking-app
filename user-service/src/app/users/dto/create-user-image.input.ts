import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserImageInput {
  @Field()
  imageUrl!: string;

  @Field(() => Int, { defaultValue: 0 })
  position!: number;
}
