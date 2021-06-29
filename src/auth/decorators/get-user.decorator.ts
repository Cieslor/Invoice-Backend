import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user,
);
