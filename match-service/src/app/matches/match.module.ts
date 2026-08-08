import { Module } from '@nestjs/common';
import { MatchResolver } from './match.resolver';

@Module({
  providers: [MatchResolver],
})
export class MatchModule {}
