import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Section {
  @Field(() => Int)
  id: number
  @Field(() => Int)
  sectionId: number
  @Field()
  name: string
  @Field(() => Int)
  status: number
  @Field()
  fkSubjectId: string
}
