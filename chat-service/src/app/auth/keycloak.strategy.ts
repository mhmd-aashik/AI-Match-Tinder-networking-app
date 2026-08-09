import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';

interface KeycloakPayload {
  sub: string;
  preferred_username: string;
  email: string;
  realm_access: {
    roles: string[];
  };
}

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri:
          'http://localhost:8080/realms/tinder-ai/protocol/openid-connect/certs',
      }),

      algorithms: ['RS256'],

      issuer: 'http://localhost:8080/realms/tinder-ai',
    });
  }

  validate(payload: KeycloakPayload) {
    return {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      roles: payload.realm_access?.roles ?? [],
    };
  }
}
