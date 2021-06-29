import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class InvoiceItem {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  totalPrice?: number;
}
