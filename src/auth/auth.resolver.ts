import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { User } from './types/user.type';
import { UserToken } from './types/user-token.type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => UserToken)
  login(@Args('input') input: AuthLoginInput) {
    return this.service.login(input);
  }

  @Mutation(() => User)
  register(@Args('input') input: AuthRegisterInput) {
    return this.service.register(input);
  }
}
