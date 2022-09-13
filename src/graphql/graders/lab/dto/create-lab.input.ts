import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLabInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
