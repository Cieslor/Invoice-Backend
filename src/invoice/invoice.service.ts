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
import { InvoiceStatus } from './enums/invoice-status.enum';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { GetInvoicesArgs } from './dto/get-invoices.args';

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

  async getInvoices(
    args: GetInvoicesArgs,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice[]> {
    const { limit, offset, status } = args;

    const filter: Record<string, any> = {
      user: userId,
    };

    if (status) {
      filter.status = status;
    }

    try {
      const invoices = await this.invoiceModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
      return invoices;
    } catch (error) {
      this.logger.error(
        `Failed to get invoices for "${userId}" - limit: ${limit}, offset: ${offset}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getInvoicesNumber(
    userId: Schema.Types.ObjectId,
    status?: InvoiceStatus,
  ): Promise<number> {
    const filter: Record<string, any> = {
      user: userId,
    };

    if (status) {
      filter.status = status;
    }

    try {
      const numberOfInvoices = await this.invoiceModel
        .countDocuments(filter)
        .exec();
      return numberOfInvoices;
    } catch (error) {
      this.logger.error(
        `Failed to count invoices for "${userId}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateInvoiceStatus(
    id: Schema.Types.ObjectId,
    status: InvoiceStatus,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice> {
    let result;

    try {
      result = await this.invoiceModel.findOneAndUpdate(
        {
          _id: id,
          user: userId,
        },
        { status },
        { new: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to update status of invoice with ID "${id}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    if (!result) {
      throw new NotFoundException(`Invoice with ID "${id}" not found.`);
    }

    return result;
  }

  async updateInvoice(
    id: Schema.Types.ObjectId,
    input: UpdateInvoiceInput,
    userId: Schema.Types.ObjectId,
  ): Promise<Invoice> {
    let result;

    try {
      result = await this.invoiceModel.findOneAndUpdate(
        {
          _id: id,
          user: userId,
        },
        {
          ...input,
          items: input.items.map((item) => ({
            ...item,
            totalPrice: item.quantity * item.price,
          })),
        },
        { new: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to update invoice with ID "${id}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    if (!result) {
      throw new NotFoundException(`Invoice with ID "${id}" not found.`);
    }

    return result;
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
