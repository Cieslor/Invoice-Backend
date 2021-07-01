import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Invoice } from './types/invoice.type';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { InvoiceService } from './invoice.service';
import { GqlAuthGuard, GetUser, User } from '../auth';
import { InvoiceStatus } from './enums/invoice-status.enum';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { GetInvoicesArgs } from './dto/get-invoices.args';

@UseGuards(GqlAuthGuard)
@Resolver()
export class InvoiceResolver {
  constructor(private service: InvoiceService) {}

  @Mutation(() => Invoice)
  createInvoice(
    @Args('input') input: CreateInvoiceInput,
    @GetUser() user: User,
  ) {
    return this.service.createInvoice(input, user._id);
  }

  @Query(() => Invoice)
  getInvoiceById(
    @Args('id', { type: () => String })
    id: Schema.Types.ObjectId,
    @GetUser() user: User,
  ) {
    return this.service.getInvoiceById(id, user._id);
  }

  @Query(() => [Invoice])
  getInvoices(@Args() args: GetInvoicesArgs, @GetUser() user: User) {
    return this.service.getInvoices(args, user._id);
  }

  @Query(() => Number)
  getInvoicesNumber(
    @Args('status', { type: () => InvoiceStatus, nullable: true })
    status: InvoiceStatus,
    @GetUser() user: User,
  ) {
    return this.service.getInvoicesNumber(user._id, status);
  }

  @Mutation(() => Invoice)
  updateInvoiceStatus(
    @Args('id', { type: () => String }) id: Schema.Types.ObjectId,
    @Args('status', { type: () => InvoiceStatus }) status: InvoiceStatus,
    @GetUser() user: User,
  ) {
    return this.service.updateInvoiceStatus(id, status, user._id);
  }

  @Mutation(() => Invoice)
  updateInvoice(
    @Args('id', { type: () => String }) id: Schema.Types.ObjectId,
    @Args('input') input: UpdateInvoiceInput,
    @GetUser() user: User,
  ) {
    return this.service.updateInvoice(id, input, user._id);
  }

  @Mutation(() => Invoice)
  deleteInvoice(
    @Args('id', { type: () => String })
    id: Schema.Types.ObjectId,
    @GetUser() user: User,
  ) {
    return this.service.deleteInvoice(id, user._id);
  }
}
