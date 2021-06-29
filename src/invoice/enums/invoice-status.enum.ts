import { registerEnumType } from '@nestjs/graphql';

export enum InvoiceStatus {
  Pending = 'PENDING',
  Draft = 'DRAFT',
  Paid = 'PAID',
}

registerEnumType(InvoiceStatus, {
  name: 'InvoiceStatus',
});
