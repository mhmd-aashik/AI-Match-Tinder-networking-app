import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MatchEventsController {
  @EventPattern('match.created')
  handleMatchCreated(
    @Payload()
    event: {
      matchId: string;
      userOneId: string;
      userTwoId: string;
      createdAt: string;
    },
  ) {
    console.log('match.created received', event);
  }
}
