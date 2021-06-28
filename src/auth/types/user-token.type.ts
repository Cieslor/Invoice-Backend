import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.type';

@ObjectType()
export class UserToken {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
