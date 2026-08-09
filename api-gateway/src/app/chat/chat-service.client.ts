import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatServiceClient {
  private readonly endpoint = 'http://localhost:3004/graphql';

  async getMyConversations(authorization: string) {
    const query = `
      query {
        myConversations {
          id
          matchId
          userOneId
          userTwoId
          createdAt

          icebreaker {
            id
            content
            createdAt
          }

          messages {
            id
            senderUserId
            content
            createdAt
          }
        }
      }
    `;

    const response = await axios.post(
      this.endpoint,
      {
        query,
      },
      {
        headers: {
          Authorization: authorization,
        },
      },
    );

    if (response.data.errors) {
      throw new Error(response.data.errors[0]?.message ?? 'Chat service error');
    }

    return response.data.data.myConversations;
  }
}
