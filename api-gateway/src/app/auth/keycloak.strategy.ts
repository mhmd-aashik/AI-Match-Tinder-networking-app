import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import jwksRsa from 'jwks-rsa';
import { KeycloakJwtPayload } from './types/keycloak-jwt-payload.type';
import { Injectable } from '@nestjs/common';

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

  override validate(payload: KeycloakJwtPayload) {
    return {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      roles: payload.realm_access?.roles ?? [],
    };
  }
}
