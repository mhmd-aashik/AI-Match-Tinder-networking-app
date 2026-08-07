import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloak.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [PassportModule],
  providers: [KeycloakStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
