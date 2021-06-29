import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Invoice } from './types/invoice.type';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { InvoiceService } from './invoice.service';
import { GqlAuthGuard, GetUser, User } from '../auth';

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

  @Mutation(() => Invoice)
  deleteInvoice(
    @Args('id', { type: () => String })
    id: Schema.Types.ObjectId,
    @GetUser() user: User,
  ) {
    return this.service.deleteInvoice(id, user._id);
  }
}
