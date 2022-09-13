import { CreateLabInput } from './create-lab.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLabInput extends PartialType(CreateLabInput) {
  @Field(() => Int)
  id: number;
}
