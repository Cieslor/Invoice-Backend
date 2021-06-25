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
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: Errors.WEAK_PASSWORD,
  })
  @Field()
  password: string;
}
