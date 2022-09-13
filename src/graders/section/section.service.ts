import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtDecodeService } from "../../services/jwt-decode/jwtDecode.service";
import { Section } from "../../db/entities/section.entity";
import { EntityEnum } from "../../db/enum/entities-enum";
import { LogService } from "../../services/log/log.service";

@Injectable()
export class SectionService {
  private logger = new LogService(SectionService.name);
  constructor(
    @Inject(EntityEnum.sectionDB)
    private sectionDB: typeof Section,
    private jwtDecodeService: JwtDecodeService
  ) {}

  async findSectionById(reqSectionId: string) {
    //: Promise<Subject[]>
    const tag = this.findSectionById.name;
    try {
      const sectionId = reqSectionId;
      const result = await this.sectionDB.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          id: sectionId,
        },
      });
      this.logger.debug(`${tag} -> `, result);
      return result;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findSectionBySubjectId(reqSubjectId: string) {
    //: Promise<Subject[]>
    const tag = this.findSectionById.name;
    try {
      const subjectId = reqSubjectId;
      const result = await this.sectionDB.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          fkSubjectId: subjectId,
        },
      });
      this.logger.debug(`${tag} -> `, result);
      return result;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
