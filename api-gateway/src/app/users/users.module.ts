import { Module } from '@nestjs/common';

import { UserServiceClient } from './user-service.client';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UserServiceClient, UsersResolver],
  exports: [UserServiceClient],
})
export class UsersModule {}
