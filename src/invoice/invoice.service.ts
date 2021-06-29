import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Invoice, InvoiceDocument } from './models/invoice.model';
import { CreateInvoiceInput } from './dto/create-invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  private logger = new Logger('Invoice service', true);

  async createInvoice(
    input: CreateInvoiceInput,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice> {
    try {
      const invoice = await this.invoiceModel.create({
        ...input,
        createdAt: new Date(),
        items: input.items.map((item) => ({
          ...item,
          totalPrice: item.quantity * item.price,
        })),
        user: userId,
      });
      await invoice.save();
      return invoice;
    } catch (error) {
      this.logger.error(
        `Failed to create invoice for user with ID "${userId}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getInvoiceById(
    id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice> {
    let found;

    try {
      found = await this.invoiceModel
        .findOne({
          _id: id,
          user: userId,
        })
        .exec();
    } catch (error) {
      this.logger.error(`Failed to get invoice with ID "${id}".`, error.stack);
      throw new InternalServerErrorException();
    }

    if (!found) {
      throw new NotFoundException(`Invoice with ID "${id}" not found.`);
    }

    return found;
  }

  async deleteInvoice(
    id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice> {
    let result;

    try {
      result = await this.invoiceModel.findOneAndDelete({
        _id: id,
        user: userId,
      });
    } catch (error) {
      this.logger.error(
        `Failed to delete invoice with ID "${id}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    if (!result) {
      throw new NotFoundException(`Invoice with ID "${id}" not found.`);
    }

    return result;
  }
}
