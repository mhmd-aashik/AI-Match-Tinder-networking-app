import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AiService } from '../ai/ai.service';

@Controller()
export class MatchEventsController {
  constructor(private readonly aiService: AiService) {}

  @EventPattern('match.created')
  async handleMatchCreated(
    @Payload()
    event: {
      matchId: string;
      userOneId: string;
      userTwoId: string;
      createdAt: string;
    },
  ) {
    console.log('4. AI SERVICE RECEIVED:', event);

    const iceBreaker = await this.aiService.generateIceBreaker(
      event.userOneId,
      event.userTwoId,
    );

    console.log('5. AI ICEBREAKER:', iceBreaker);
  }
}
