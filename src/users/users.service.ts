import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { EnumStatus } from "../services/enum/enum-status";
import { LogService } from "../services/log/log.service";
import { firstValueFrom } from "rxjs";
import { UserTokenDto } from "./dto/token-.dto";
import { JwtDecodeService } from "../services/jwt-decode/jwtDecode.service";
import { EntityEnum } from "../db/enum/entities-enum";
import { Role } from "./../db/entities/role.entity";
import { timeStamp } from "console";
import { UserRole } from "./../db/entities/userRole.entity";
import * as _ from "lodash";
@Injectable()
export class UsersService {
  private logger = new LogService(UsersService.name);
  constructor(
    @Inject(EntityEnum.userRoleDB)
    private userRoleDB: typeof UserRole,
    @Inject(EntityEnum.roleDB)
    private roleDB: typeof Role,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  async api_checkClass() {
    const tag = this.api_checkClass.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: { status: "success" },
        msg: "",
      };
      // this.logger.debug("req->", userDto.test);
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async api_getRole(req: any) {
    const tag = this.api_getRole.name;
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new UnauthorizedException();
      const decoded = await this.jwtDecodeService.jwtDecode(req);
      if (!decoded) throw new UnauthorizedException();

      const resData = {
        resCode: EnumStatus.success,
        resData: await this.getRole(decoded.studentCode),
        msg: "",
      };
      // this.logger.debug("req->", userDto.test);
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getRole(studentCode: string) {
    const tag = this.getRole.name;
    try {
      const roleDisplayName = await this.roleDB.findAll();
      const role = await this.userRoleDB.findAll({
        where: { fkStudentCode: studentCode },
      });

      const roleList = [];
      for (const [index, iterator] of role.entries()) {
        for (const x of roleDisplayName) {
          if (String(iterator.fkRoleId) == String(x.role)) {
            roleList.push({role: x.displayName, level: x.roleLevel});
          }
        }
      }
      const roleSortByLevel = _.orderBy(roleList, ["level"], ['desc']).map(x => x.role);
      return roleSortByLevel;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
