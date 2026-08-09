import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import type { AuthUser } from '../auth/auth-user.type';
import { CurrentUser } from '../auth/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserImage } from './models/user-image.model';
import { CreateUserImageInput } from './dto/create-user-image.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Query(() => User, { nullable: true })
  async userByKeycloakId(@Args('keycloakId') keycloakId: string) {
    try {
      return await this.usersService.findByKeycloakId(keycloakId);
    } catch {
      return null;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(
    @CurrentUser() user: AuthUser,
    @Args('input') input: CreateUserInput,
  ) {
    return this.usersService.create(user.id, input);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.usersService.update(id, input);
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => [UserImage])
  async images(@Parent() user: User) {
    return this.usersService.findImagesByUserId(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserImage)
  async addProfileImage(
    @CurrentUser() authUser: AuthUser,
    @Args('input') input: CreateUserImageInput,
  ) {
    const user = await this.usersService.findByKeycloakId(authUser.id);

    return this.usersService.addImage(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserImage)
  async deleteProfileImage(
    @CurrentUser() authUser: AuthUser,
    @Args('imageId') imageId: string,
  ) {
    const user = await this.usersService.findByKeycloakId(authUser.id);

    return this.usersService.deleteImage(user.id, imageId);
  }
}
