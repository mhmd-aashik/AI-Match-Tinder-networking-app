import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'api-gateway/src/app/graphql/schema.gql',
      graphiql: true,
    }),
    AuthModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
