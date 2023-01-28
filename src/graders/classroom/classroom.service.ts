import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtDecodeService } from "../../services/jwt-decode/jwtDecode.service";
import { ClassRoom } from "../../db/entities/classroom.entity";
import { EntityEnum } from "../../db/enum/entities-enum";
import { EnumStatus } from "../../services/enum/enum-status";
import { LogService } from "../../services/log/log.service";
import { SubjectsService } from "./../subjects/subjects.service";
import { SectionService } from "./../section/section.service";
import { Lab } from "./../../db/entities/lab.entity";
import { LabStatus } from "./../../db/entities/labStatus.entity";
import { FindLabsDto } from "./dto/findLabs";
import { Op } from "sequelize";

@Injectable()
export class ClassroomService {
  private logger = new LogService(ClassroomService.name);

  constructor(
    @Inject(EntityEnum.classroomDB)
    private classroomDB: typeof ClassRoom,
    @Inject(EntityEnum.labDB)
    private labDB: typeof Lab,
    @Inject(EntityEnum.labStatusDB)
    private labStatusDB: typeof LabStatus,
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

  async api_getLabs(req: any, findLabsDto: FindLabsDto) {
    const tag = this.api_getLabs.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: await this.getLabs(req, findLabsDto),
        msg: "",
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async getLabs(req: any, findLabsDto: FindLabsDto) {
    const tag = this.getLabs.name;
    try {
      const subjectId = findLabsDto.subjectId;
      const decoded = await this.jwtDecodeService.jwtDecode(req);
      const classroomData = await this.classroomDB.findAll({
        attributes: ["fkSectionId"],
        where: {
          [Op.and]: [
            { fkSubjectId: subjectId },
            { fkStudentCode: decoded.studentCode },
          ],
        },
      });
      if (classroomData.length === 0) return [];
      const sectionData = await this.sectionService.findSectionById(
        String(classroomData[0].fkSectionId)
      );
      const labs = await this.labDB.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          fkSubjectId: subjectId,
        },
      });

      this.logger.debug(`${tag} -> `, sectionData);
      const statusBySection = await this.labStatusDB.findAll({
        attributes: ["status"],
        where: {
          [Op.and]: [
            { fkSubjectId: subjectId },
            { fkSectionId: sectionData[0].id },
          ],
        },
      });
      this.logger.debug(`${tag} -> `, statusBySection);

      if (labs.length === 0 && statusBySection.length === 0) return [];
      this.logger.debug(statusBySection[0]);
      for (const [index, iterator] of JSON.parse(
        statusBySection[0].status
      ).entries()) {
        this.logger.debug(iterator);
        if (labs[index] == undefined) break;
        // if (iterator === 0) {
        //   labs[index].status = 0;
        // }
        labs[index] = Object.assign(JSON.parse(JSON.stringify(labs[index])), {
          status: iterator,
          sectionId: sectionData[0].section,
          sectionName: sectionData[0].name,
        });
      }
      const labsClone = labs.filter((item) => {
        return item.status !== 0;
      });
      return labsClone;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
