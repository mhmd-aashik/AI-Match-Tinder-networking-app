import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloak.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [PassportModule],
  providers: [KeycloakStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
