import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';
import { Errors } from '../../common/errors';

@InputType()
export class AuthLoginInput {
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @IsEmail({}, { message: Errors.MUST_BE_AN_EMAIL })
  @Field()
  email: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  password: string;
}
