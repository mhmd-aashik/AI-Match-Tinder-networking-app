import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import type { AuthUser } from '../auth/types/auth-user.type';
import { UserServiceClient } from '../users/user-service.client';

import { CreateSwipeInput, SwipeAction } from './dto/create-swipe.input';
import { MatchServiceClient } from './match-service.client';
import { SwipeResult } from './models/swipe-result.model';

@Resolver()
export class MatchesResolver {
  constructor(
    private readonly matchServiceClient: MatchServiceClient,
    private readonly userServiceClient: UserServiceClient,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SwipeResult)
  async swipe(
    @CurrentUser() user: AuthUser,
    @Args('input') input: CreateSwipeInput,
  ) {
    const profile = await this.userServiceClient.getUserByKeycloakId(user.id);

    if (!profile) {
      throw new NotFoundException(
        'User profile not found. Create your profile before swiping.',
      );
    }

    return this.matchServiceClient.swipe(
      profile.id,
      input.targetUserId,
      input.action === SwipeAction.LIKE ? 'like' : 'pass',
    );
  }
}
