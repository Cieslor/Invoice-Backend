import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsDate, IsEnum } from 'class-validator';
import { Errors } from '../../common/errors';
import { PaymentTerms } from '../enums/payment-terms.enum';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { InvoiceItemInput } from './invoice-item.input';

@InputType()
export class CreateInvoiceInput {
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromCity: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromStreetAddress: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromCountry: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromPostCode: string;

  @IsDate()
  @Field(() => Date)
  invoiceDate: Date;

  @IsEnum(PaymentTerms)
  @Field(() => PaymentTerms)
  paymentTerms: PaymentTerms;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  projectDescription: string;

  @IsEnum(InvoiceStatus)
  @Field(() => InvoiceStatus)
  status: InvoiceStatus;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toCity: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toStreetAddress: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toCountry: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toPostCode: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  clientsName: string;

  @IsString({ message: Errors.MUST_BE_A_STRING })
  @IsEmail({}, { message: Errors.MUST_BE_AN_EMAIL })
  @Field()
  clientsEmail: string;

  @Field(() => [InvoiceItemInput])
  items: InvoiceItemInput[];
}
