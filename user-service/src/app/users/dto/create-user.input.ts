import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(2, 100)
  displayName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field()
  @IsDateString()
  dateOfBirth!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  gender?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  profileImageUrl?: string;
}
