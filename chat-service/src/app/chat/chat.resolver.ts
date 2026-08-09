import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';

@Resolver(() => Conversation)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Conversation, { nullable: true })
  async conversation(@Args('id') id: string) {
    return this.chatService.findConversationById(id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() conversation: Conversation) {
    return this.chatService.findMessagesByConversationId(conversation.id);
  }
}
