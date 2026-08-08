import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private readonly googleGenAI: GoogleGenAI;
  constructor() {
    this.googleGenAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async generateIceBreaker(
    userOneId: string,
    userTwoId: string,
  ): Promise<string> {
    // // Temporary 🤖
    // return `Start a conversation by asking about a shared interest or recent project.`;
    const response = await this.googleGenAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `
        Two users just matched.

        User 1 ID: ${userOneId}
        User 2 ID: ${userTwoId}

        Generate one short, friendly conversation starter.
        Keep it natural and under 20 words.
      `,
    });

    return response.text ?? 'Say hello and ask about a shared interest.';
  }
}
