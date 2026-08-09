import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { ChatServiceClient } from './chat-service.client';
import { Conversation } from './models/conversation.model';

@Resolver(() => Conversation)
export class ChatResolver {
  constructor(private readonly chatServiceClient: ChatServiceClient) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async myConversations(
    @Context()
    context: {
      req: {
        headers: {
          authorization?: string;
        };
      };
    },
  ) {
    return this.chatServiceClient.getMyConversations(
      context.req.headers.authorization ?? '',
    );
  }
}
