import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from './types/invoice.type';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { InvoiceService } from './invoice.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private service: InvoiceService) {}

  @Mutation(() => Invoice)
  createInvoice(@Args('input') input: CreateInvoiceInput) {
    return this.service.createInvoice(input);
  }
}
