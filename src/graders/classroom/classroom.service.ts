import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtDecodeService } from "../../services/jwt-decode/jwtDecode.service";
import { ClassRoom } from "../../db/entities/classroom.entity";
import { EntityEnum } from "../../db/enum/entities-enum";
import { EnumStatus } from "../../services/enum/enum-status";
import { LogService } from "../../services/log/log.service";
import { SubjectsService } from "./../subjects/subjects.service";
import { SectionService } from "./../section/section.service";

@Injectable()
export class ClassroomService {
  private logger = new LogService(ClassroomService.name);

  constructor(
    @Inject(EntityEnum.classroomDB)
    private classroomDB: typeof ClassRoom,
    private jwtDecodeService: JwtDecodeService,
    private subjectsService: SubjectsService,
    private sectionService: SectionService
  ) {}
  async api_findClassByStudentCode(req: any) {
    const tag = this.api_findClassByStudentCode.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: await this.findClassByStudentCode(req),
        msg: "",
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findClassByStudentCode(req: any) {
    const tag = this.findClassByStudentCode.name;
    try {
      const decoded = await this.jwtDecodeService.jwtDecode(req);
      const result = await this.classroomDB.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          fkStudentCode: decoded.studentCode,
        },
      });
      const subject = [];
      for (const [index, iterator] of result.entries()) {
        const subjectArray = await this.subjectsService.findSubjectById(
          String(iterator.fkSubjectId)
        );
        const sectionArray = await this.sectionService.findSectionById(
          String(iterator.fkSectionId)
        );
        result[index] = Object.assign(
          JSON.parse(JSON.stringify(result[index])),
          {
            subject: subjectArray[0],
          }
        );
        result[index] = Object.assign(
          JSON.parse(JSON.stringify(result[index])),
          {
            section: sectionArray[0],
          }
        );
        // subject.push(subjectArray[0]);
      }

      this.logger.debug(`${tag} -> `, subject);
      return result;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
