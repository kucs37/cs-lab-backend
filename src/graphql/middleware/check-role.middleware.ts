import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value;
};

export default checkRoleMiddleware;