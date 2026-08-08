import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MatchResolver {
  @Query(() => String)
  matchServiceStatus() {
    return 'Match service running';
  }
}
