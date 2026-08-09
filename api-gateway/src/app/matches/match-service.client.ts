import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MatchServiceClient {
  private readonly endpoint = 'http://localhost:3002/graphql';

  async swipe(
    swiperUserId: string,
    targetUserId: string,
    action: 'like' | 'pass',
  ) {
    const mutation = `
      mutation Swipe(
        $swiperUserId: String!
        $input: CreateSwipeInput!
      ) {
        swipe(
          swiperUserId: $swiperUserId
          input: $input
        ) {
          swipe {
            id
            swiperUserId
            targetUserId
            action
            createdAt
          }

          match {
            id
            userOneId
            userTwoId
            createdAt
          }
        }
      }
    `;

    const response = await axios.post(this.endpoint, {
      query: mutation,
      variables: {
        swiperUserId,
        input: {
          targetUserId,
          action,
        },
      },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors[0]?.message ?? 'Match service error',
      );
    }

    return response.data.data.swipe;
  }
}
