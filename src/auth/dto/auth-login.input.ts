import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class AuthLoginInput {
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
