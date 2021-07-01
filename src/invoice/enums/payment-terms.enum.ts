import { registerEnumType } from '@nestjs/graphql';

export enum PaymentTerms {
  One = 1,
  Seven = 7,
  Fourteen = 14,
  Thirty = 30,
}

registerEnumType(PaymentTerms, {
  name: 'PaymentTerms',
});
