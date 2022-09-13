import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Subject {
  @Field()
  subjectId: string
  @Field()
  name: string
}
