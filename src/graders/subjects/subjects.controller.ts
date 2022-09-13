import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
  
  // @ApiBearerAuth()
  // @Get("studentClass")
  // async findAllSubjectBelongToStudent(@Req() req) {
  //   return this.subjectsService.api_findClassByStudentCode(req);
  // }
}
