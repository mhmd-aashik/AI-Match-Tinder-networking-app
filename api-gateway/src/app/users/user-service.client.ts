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
}
