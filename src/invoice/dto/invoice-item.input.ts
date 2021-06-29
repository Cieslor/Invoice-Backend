import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsNumber } from 'class-validator';
import { Errors } from '../../common/errors';

@InputType()
export class InvoiceItemInput {
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  name: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsInt()
  @Field(() => Int)
  quantity: number;
}
