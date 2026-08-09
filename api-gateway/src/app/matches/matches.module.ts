import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { MatchServiceClient } from './match-service.client';
import { MatchesResolver } from './matches.resolver';

@Module({
  imports: [UsersModule],
  providers: [MatchServiceClient, MatchesResolver],
})
export class MatchesModule {}
