import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserToken {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
