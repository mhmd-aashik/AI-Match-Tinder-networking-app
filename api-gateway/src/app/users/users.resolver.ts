import { Query, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserServiceClient } from './user-service.client';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userServiceClient: UserServiceClient) {}

  @Query(() => [User])
  async users() {
    return this.userServiceClient.getUsers();
  }
}
