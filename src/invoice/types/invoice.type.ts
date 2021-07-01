import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { PaymentTerms } from '../enums/payment-terms.enum';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { InvoiceItem } from './invoice-item.type';

@ObjectType()
export class Invoice {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  fromCity?: string;

  @Field(() => String, { nullable: true })
  fromStreetAddress?: string;

  @Field(() => String, { nullable: true })
  fromCountry?: string;

  @Field(() => String, { nullable: true })
  fromPostCode?: string;

  @Field(() => Date, { nullable: true })
  invoiceDate?: Date;

  @Field(() => PaymentTerms, { nullable: true })
  paymentTerms?: PaymentTerms;

  @Field(() => String, { nullable: true })
  projectDescription?: string;

  @Field(() => InvoiceStatus, { nullable: true })
  status?: InvoiceStatus;

  @Field(() => String, { nullable: true })
  toCity?: string;

  @Field(() => String, { nullable: true })
  toStreetAddress?: string;

  @Field(() => String, { nullable: true })
  toCountry?: string;

  @Field(() => String, { nullable: true })
  toPostCode?: string;

  @Field(() => String, { nullable: true })
  clientsName?: string;

  @Field(() => String, { nullable: true })
  clientsEmail?: string;

  @Field(() => [InvoiceItem], { nullable: true })
  items?: InvoiceItem[];

  @Field(() => String, { nullable: true })
  user?: MongooseSchema.Types.ObjectId;
}
