import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GatewayResolver {
  @Query(() => String)
  gatewayStatus() {
    return 'API Gateway running';
  }
}
