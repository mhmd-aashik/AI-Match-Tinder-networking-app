import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { GqlAuthGuard } from './gql-auth.guard';
import { KeycloakStrategy } from './keycloak.strategy';

@Module({
  imports: [PassportModule],

  providers: [KeycloakStrategy, GqlAuthGuard],

  exports: [GqlAuthGuard],
})
export class AuthModule {}
