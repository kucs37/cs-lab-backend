import { Injectable } from "@nestjs/common";
import { CreateClassroomInput } from "./dto/create-classroom.input";
import { UpdateClassroomInput } from "./dto/update-classroom.input";

@Injectable()
export class ClassroomService {
    constructor( ) {}

    create(createClassroomInput: CreateClassroomInput) {
        return "This action adds a new classroom";
    }

    findAll(req:any) {
        return [
            {
                classroomId: "4",
                fkStudentCode: "6510405814",
                fkSubjectId: "CS112",
                fkSectionId: 2,
                subject: {
                    subjectId: "CS112",
                    name: "Fundamental Programming Concepts",
                },
                section: {
                    id: 2,
                    sectionId: 1,
                    name: "หมู่ 1",
                    status: 1,
                    fkSubjectId: "CS112",
                },
            },
        ];
    }

    findOne(id: number) {
        return `This action returns a #${id} classroom`;
    }

    update(id: number, updateClassroomInput: UpdateClassroomInput) {
        return `This action updates a #${id} classroom`;
    }

    remove(id: number) {
        return `This action removes a #${id} classroom`;
    }
}
