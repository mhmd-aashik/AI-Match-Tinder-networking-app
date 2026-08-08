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

  async generateIcebreaker(
    userOne: {
      displayName: string;
      bio?: string | null;
      city?: string | null;
      country?: string | null;
    },
    userTwo: {
      displayName: string;
      bio?: string | null;
      city?: string | null;
      country?: string | null;
    },
  ): Promise<string> {
    const response = await this.googleGenAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Two users just matched.
  
        User one:
        Name: ${userOne.displayName}
        Bio: ${userOne.bio ?? 'Not provided'}
        Location: ${userOne.city ?? ''} ${userOne.country ?? ''}
  
        User two:
        Name: ${userTwo.displayName}
        Bio: ${userTwo.bio ?? 'Not provided'}
        Location: ${userTwo.city ?? ''} ${userTwo.country ?? ''}
  
        Generate one short, friendly conversation starter
        based only on the profile information above.
      `,
    });

    return response.text ?? 'Say hello and ask about a shared interest.';
  }
}
