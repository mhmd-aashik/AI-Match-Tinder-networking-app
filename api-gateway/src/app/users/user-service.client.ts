import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserServiceClient {
  private readonly endpoint = 'http://localhost:3001/graphql';

  async getUsers() {
    const query = `
     query {
       users(page: 1, limit: 10) {
         id
         displayName
         bio
         city
         country
         profileImageUrl
       }
     }
   `;

    const response = await axios.post(this.endpoint, {
      query,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0]?.message ?? 'User service error');
    }

    return response.data.data.users;
  }

  async createUser(
    authorization: string,
    input: {
      displayName: string;
      bio?: string;
      dateOfBirth: string;
      gender?: string;
      city?: string;
      country?: string;
      profileImageUrl?: string;
    },
  ) {
    const mutation = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          keycloakId
          displayName
          bio
          dateOfBirth
          gender
          city
          country
          profileImageUrl
        }
      }
    `;

    const response = await axios.post(
      this.endpoint,
      {
        query: mutation,
        variables: {
          input,
        },
      },
      {
        headers: {
          Authorization: authorization,
        },
      },
    );

    if (response.data.errors) {
      throw new Error(response.data.errors[0]?.message ?? 'User service error');
    }

    return response.data.data.createUser;
  }
}
