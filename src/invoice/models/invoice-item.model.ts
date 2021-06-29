import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class InvoiceItem {
  @Prop()
  name: string;

  @Prop(Number)
  price: number;

  @Prop(Number)
  quantity: number;

  @Prop(Number)
  totalPrice: number;
}

export type InvoiceItemDocument = InvoiceItem & Document;

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
