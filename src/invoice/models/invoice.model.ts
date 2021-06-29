import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { PaymentTerms } from '../enums/payment-terms.enum';
import { InvoiceItem, InvoiceItemSchema } from './invoice-item.model';

@Schema()
export class Invoice {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  fromCity: string;

  @Prop()
  fromStreetAddress: string;

  @Prop()
  fromCountry: string;

  @Prop()
  fromPostCode: string;

  @Prop()
  invoiceDate: Date;

  @Prop()
  paymentTerms: PaymentTerms;

  @Prop()
  projectDescription: string;

  @Prop()
  status: InvoiceStatus;

  @Prop()
  toCity: string;

  @Prop()
  toStreetAddress: string;

  @Prop()
  toCountry: string;

  @Prop()
  toPostCode: string;

  @Prop()
  clientsName: string;

  @Prop()
  clientsEmail: string;

  @Prop({ type: [InvoiceItemSchema] })
  items: InvoiceItem[];

  @Prop(MongooseSchema.Types.ObjectId)
  user: MongooseSchema.Types.ObjectId;
}

export type InvoiceDocument = Invoice & Document;

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
