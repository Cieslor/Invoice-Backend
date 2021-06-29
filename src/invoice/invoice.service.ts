import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './models/invoice.model';
import { CreateInvoiceInput } from './dto/create-invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
    const invoice = await this.invoiceModel.create({
      ...input,
      createdAt: new Date(),
      user: '60d5b89622c743252828a6c5',
      items: input.items.map((item) => ({
        ...item,
        totalPrice: item.quantity * item.price,
      })),
    });

    try {
      await invoice.save();
      return invoice;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
