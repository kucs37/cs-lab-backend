import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LogService } from "../../services/log/log.service";
import { EntityEnum } from "../../db/enum/entities-enum";
import { JwtDecodeService } from "../../services/jwt-decode/jwtDecode.service";
import { EnumStatus } from "../../services/enum/enum-status";
import { FindSubjectByIdDto } from "./dto/findSubjectById.dto";
import { Subject } from './../../db/entities/subject.entity';

@Injectable()
export class SubjectsService {
  private logger = new LogService(SubjectsService.name);

  constructor(
    @Inject(EntityEnum.subjectDB)
    private subjectDB: typeof Subject,
    private jwtDecodeService: JwtDecodeService
  ) {}
  
  async findSubjectById(reqSubjectId: string){ //: Promise<Subject[]> 
    const tag = this.findSubjectById.name;
    try {
      const subjectId = reqSubjectId;
      console.log("subjectId: ", subjectId);
      
      const result = await this.subjectDB.findAll({
        where: {
          subjectId: subjectId,
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
