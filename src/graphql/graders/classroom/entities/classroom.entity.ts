import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Section } from "./section.entity";
import { Subject } from "./subject.entity";

@ObjectType()
export class Classroom {
    @Field()
    classroomId: string;
    @Field()
    fkStudentCode: string;
    @Field()
    fkSubjectId: string;
    @Field(() => Int)
    fkSectionId: number;
    @Field(() => Subject)
    subject: Subject;
    @Field(() => Section)
    section: Section;
}
