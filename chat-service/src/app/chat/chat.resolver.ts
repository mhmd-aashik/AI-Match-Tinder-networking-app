import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import type { AuthUser } from '../auth/auth-user.type';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Conversation)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Conversation, { nullable: true })
  async conversation(@CurrentUser() user: AuthUser, @Args('id') id: string) {
    return this.chatService.findConversationForUser(id, user.id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() conversation: Conversation) {
    return this.chatService.findMessagesByConversationId(conversation.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async myConversations(@CurrentUser() user: AuthUser) {
    return this.chatService.findConversationsForUser(user.id);
  }
}
