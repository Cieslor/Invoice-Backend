import { Field, InputType } from '@nestjs/graphql';
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
    message: 'password is too weak',
  })
  @Field()
  password: string;
}
