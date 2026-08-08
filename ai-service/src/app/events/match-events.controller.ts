import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { AiService } from '../ai/ai.service';
import { UserProfileClient } from '../users/user-profile.client';

@Controller()
export class MatchEventsController {
  constructor(
    private readonly aiService: AiService,
    private readonly userProfileClient: UserProfileClient,

    @Inject('AI_KAFKA_SERVICE')
    private readonly kafkaService: ClientKafka,
  ) {}

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
    const [userOne, userTwo] = await Promise.all([
      this.userProfileClient.getUser(event.userOneId),
      this.userProfileClient.getUser(event.userTwoId),
    ]);

    const iceBreaker = await this.aiService.generateIcebreaker(
      userOne,
      userTwo,
    );

    this.kafkaService.emit('ai.icebreaker.generated', {
      matchId: event.matchId,
      userOneId: event.userOneId,
      userTwoId: event.userTwoId,
      iceBreaker,
      generatedAt: new Date().toISOString(),
    });
    console.log('4. AI SERVICE RECEIVED:', event);

    console.log('5. AI ICEBREAKER:', iceBreaker);
  }
}
