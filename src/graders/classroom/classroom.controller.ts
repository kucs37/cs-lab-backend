import { Controller, Get, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClassroomService } from "./classroom.service";

@Controller("classroom")
@ApiTags("Classroom")
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @ApiBearerAuth()
  @Get("studentClass")
  async findAllSubjectBelongToStudent(@Req() req) {
    return this.classroomService.api_findClassByStudentCode(req);
  }
}
