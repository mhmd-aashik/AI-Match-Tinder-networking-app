import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateIceBreaker(
    userOneId: string,
    userTwoId: string,
  ): Promise<string> {
    // Temporary 🤖
    return `Start a conversation by asking about a shared interest or recent project.`;
  }
}
