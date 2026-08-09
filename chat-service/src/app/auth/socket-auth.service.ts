import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class SocketAuthService {
  private readonly jwks;

  constructor(private readonly configService: ConfigService) {
    const issuer = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER');

    this.jwks = createRemoteJWKSet(
      new URL(`${issuer}/protocol/openid-connect/certs`),
    );
  }

  async verifyToken(token: string) {
    const issuer = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER');

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer,
        algorithms: ['RS256'],
      });

      return {
        id: payload.sub,
        username: payload.preferred_username as string | undefined,
        email: payload.email as string | undefined,
        roles:
          (payload.realm_access as { roles?: string[] } | undefined)?.roles ??
          [],
      };
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
