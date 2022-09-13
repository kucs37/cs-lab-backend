import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

const checkRoleAdministratorMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value;
};

export default checkRoleAdministratorMiddleware;