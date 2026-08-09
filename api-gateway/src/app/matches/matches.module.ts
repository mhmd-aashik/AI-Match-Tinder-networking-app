import { Module } from '@nestjs/common';

import { MatchServiceClient } from './match-service.client';
import { MatchesResolver } from './matches.resolver';

@Module({
  providers: [MatchServiceClient, MatchesResolver],
})
export class MatchesModule {}
