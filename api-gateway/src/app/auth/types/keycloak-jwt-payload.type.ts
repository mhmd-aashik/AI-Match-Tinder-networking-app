export interface KeycloakJwtPayload {
  sub: string;
  preferred_username?: string;
  email?: string;
  realm_access?: {
    roles: string[];
  };

  iss: string;
  aud?: string | string[];

  exp: number;
  iat: number;
}
