import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
    Context,
} from "@nestjs/graphql";
import { ClassroomService } from "./classroom.service";
import { Classroom } from "./entities/classroom.entity";
import { CreateClassroomInput } from "./dto/create-classroom.input";
import { UpdateClassroomInput } from "./dto/update-classroom.input";

@Resolver(() => Classroom)
export class ClassroomResolver {
    constructor(
        private readonly classroomService: ClassroomService,
    ) {}

    @Mutation(() => Classroom)
    createClassroom(
        @Args("createClassroomInput") createClassroomInput: CreateClassroomInput
    ) {
        return this.classroomService.create(createClassroomInput);
    }

    @Query(() => [Classroom], { name: "classrooms" })
    async findAll(@Context() context) {
        console.log(context.req.headers)
        return this.classroomService.findAll("sf");
    }

    @Query(() => Classroom, { name: "classroom" })
    findOne(@Args("id", { type: () => Int }) id: number) {
        return this.classroomService.findOne(id);
    }

    @Mutation(() => Classroom)
    updateClassroom(
        @Args("updateClassroomInput") updateClassroomInput: UpdateClassroomInput
    ) {
        return this.classroomService.update(
            updateClassroomInput.id,
            updateClassroomInput
        );
    }

    @Mutation(() => Classroom)
    removeClassroom(@Args("id", { type: () => Int }) id: number) {
        return this.classroomService.remove(id);
    }
}
