import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserServiceClient } from './user-service.client';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userServiceClient: UserServiceClient) {}

  @Query(() => [User])
  async users() {
    return this.userServiceClient.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,

    @Context()
    context: {
      req: {
        headers: {
          authorization?: string;
        };
      };
    },
  ) {
    return this.userServiceClient.createUser(
      context.req.headers.authorization ?? '',
      input,
    );
  }
}
