import { Field, InputType } from '@nestjs/graphql';
import { Errors } from '../../common/errors';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class AuthRegisterInput {
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @IsEmail({}, { message: Errors.MUST_BE_AN_EMAIL })
  @Field()
  email: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @MinLength(8, { message: Errors.STRING_TOO_SHORT })
  @MaxLength(32, { message: Errors.STRING_TOO_LONG })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: Errors.WEAK_PASSWORD,
  })
  @Field()
  password: string;
}
