import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { CreateSwipeInput, SwipeAction } from './dto/create-swipe.input';

import { MatchServiceClient } from './match-service.client';
import type { AuthUser } from '../auth/types/auth-user.type';
import { SwipeResult } from './models/swipe-result.model';

@Resolver()
export class MatchesResolver {
  constructor(private readonly matchServiceClient: MatchServiceClient) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SwipeResult)
  async swipe(
    @CurrentUser() user: AuthUser,
    @Args('input') input: CreateSwipeInput,
  ) {
    return this.matchServiceClient.swipe(
      user.id,
      input.targetUserId,
      input.action === SwipeAction.LIKE ? 'like' : 'pass',
    );
  }
}
