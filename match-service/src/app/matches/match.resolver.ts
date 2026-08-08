import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Swipe } from './models/swipe.model';
import { CreateSwipeInput } from './dto/create-swipe.input';
import { MatchService } from './match.service';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query(() => String)
  matchServiceStatus() {
    return 'Match service running';
  }

  @Mutation(() => Swipe)
  async swipe(
    @Args('swiperUserId') swiperUserId: string,
    @Args('input') input: CreateSwipeInput,
  ) {
    return this.matchService.createSwipe(swiperUserId, input);
  }
}
