import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lab {
    @Field()
    labId: string;
    @Field()
    name: string;
    @Field()
    type: string;
    @Field()
    fkSubjectId: string;
    @Field(() => Int)
    status: number;
    @Field(() => Int)
    sectionId: number;
    @Field()
    sectionName: string;
}
