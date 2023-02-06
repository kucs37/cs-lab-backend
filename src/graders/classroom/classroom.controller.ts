import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClassroomService } from "./classroom.service";
import { FindLabsDto } from "./dto/findLabs";

@Controller("classroom")
@ApiTags("Classroom")
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @ApiBearerAuth()
  @Get("studentInfo")
  async findAllSubjectBelongToStudent(@Req() req) {
    return this.classroomService.api_findClassByStudentId(req);
  }

  @ApiBearerAuth()
  @Post("getLabs")
  async getLabs(@Req() req, @Body() findLabsDto: FindLabsDto) {
    return this.classroomService.api_getLabs(req, findLabsDto);
  }
}
