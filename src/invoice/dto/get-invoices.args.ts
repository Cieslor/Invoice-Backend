import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { InvoiceStatus } from '../enums/invoice-status.enum';

@ArgsType()
export class GetInvoicesArgs {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  limit?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  offset?: number;

  @IsOptional()
  @Field(() => InvoiceStatus, { nullable: true })
  status?: InvoiceStatus;
}
