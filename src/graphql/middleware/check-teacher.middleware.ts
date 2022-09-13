import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

const checkRoleTeacherMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value;
};

export default checkRoleTeacherMiddleware;