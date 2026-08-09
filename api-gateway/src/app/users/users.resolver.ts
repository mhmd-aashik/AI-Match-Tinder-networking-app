import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserServiceClient } from './user-service.client';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userServiceClient: UserServiceClient) {}

  @Query(() => [User])
  async users() {
    return this.userServiceClient.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,
    @Context() context: { req: { headers: { authorization?: string } } },
  ) {
    const authorization = context.req.headers.authorization;

    if (!authorization) {
      throw new Error('Authorization header is required');
    }

    return this.userServiceClient.createUser(authorization, input);
  }
}
