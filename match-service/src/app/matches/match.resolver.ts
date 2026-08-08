import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSwipeInput } from './dto/create-swipe.input';
import { MatchService } from './match.service';
import { SwipeResult } from './models/swipe-result.model';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query(() => String)
  matchServiceStatus() {
    return 'Match service running';
  }

  @Mutation(() => SwipeResult)
  async swipe(
    @Args('swiperUserId') swiperUserId: string,
    @Args('input') input: CreateSwipeInput,
  ) {
    return this.matchService.createSwipe(swiperUserId, input);
  }
}
