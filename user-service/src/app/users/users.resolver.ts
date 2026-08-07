import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}
