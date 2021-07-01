import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsNumber, IsNotEmpty } from 'class-validator';
import { Errors } from '../../common/errors';

@InputType()
export class InvoiceItemInput {
  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  quantity: number;
}
