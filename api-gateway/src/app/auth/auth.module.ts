import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloak.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
  imports: [PassportModule],
  providers: [KeycloakStrategy, JwtAuthGuard, RolesGuard, GqlAuthGuard],
  exports: [JwtAuthGuard, GqlAuthGuard, RolesGuard],
})
export class AuthModule {}
