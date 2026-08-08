import { Injectable } from '@nestjs/common';
import axios from 'axios';

type UserProfile = {
  id: string;
  displayName: string;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
};

@Injectable()
export class UserProfileClient {
  private readonly endpoint = 'http://localhost:3001/graphql';

  async getUser(id: string): Promise<UserProfile> {
    const query = `query GetUser($id: String!) {
    user(id: $id) {
      id
      displayName
      bio
      city
      country
    }
  }
`;

    const response = await axios.post(this.endpoint, {
      query,
      variables: {
        id,
      },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors[0]?.message ?? 'Failed to fetch user',
      );
    }

    return response.data.data.user;
  }
}
