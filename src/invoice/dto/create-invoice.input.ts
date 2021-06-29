import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Errors } from '../../common/errors';
import { PaymentTerms } from '../enums/payment-terms.enum';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { InvoiceItemInput } from './invoice-item.input';

@InputType()
export class CreateInvoiceInput {
  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromCity: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromStreetAddress: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromCountry: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  fromPostCode: string;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  invoiceDate: Date;

  @IsNotEmpty()
  @IsEnum(PaymentTerms)
  @Field(() => PaymentTerms)
  paymentTerms: PaymentTerms;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  projectDescription: string;

  @IsNotEmpty()
  @IsEnum(InvoiceStatus)
  @Field(() => InvoiceStatus)
  status: InvoiceStatus;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toCity: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toStreetAddress: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toCountry: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  toPostCode: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @Field()
  clientsName: string;

  @IsNotEmpty()
  @IsString({ message: Errors.MUST_BE_A_STRING })
  @IsEmail({}, { message: Errors.MUST_BE_AN_EMAIL })
  @Field()
  clientsEmail: string;

  @IsNotEmpty()
  @Field(() => [InvoiceItemInput])
  items: InvoiceItemInput[];
}
