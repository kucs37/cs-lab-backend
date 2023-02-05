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
import { log, timeStamp } from "console";
import { UserRole } from "./../db/entities/userRole.entity";
import * as _ from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoleDB, UserDB } from "../database/schema/user.schema";
import { EntityEnumMongo } from "../database/entity";
import { RoleCache } from "../services/interface/roleCache.interface";
@Injectable()
export class UsersService {
  private logger = new LogService(UsersService.name);
  constructor(
    @InjectModel(EntityEnumMongo.userDB) private userModel: Model<UserDB>,
    // @InjectModel(EntityEnumMongo.roleDB) private roleDB: Model<RoleDB>,
    @Inject(EntityEnum.userRoleDB)
    private userRoleDB: typeof UserRole,
    // @Inject(EntityEnum.roleDB)
    // private roleDB: typeof Role,
    private jwtDecodeService: JwtDecodeService
  ) {}

  async onApplicationBootstrap() {
    // const createdUser = new this.userModel();
    // createdUser.studentId = "6510405601";
    // createdUser.email = "teerut.s@ku.th";
    // createdUser.firstName = "teerut";
    // createdUser.lastName = "teerut";
    // createdUser.username = "teerut";
    // createdUser.password = "teerut";
    // const createRole = [];
    // createRole.push({
    //   displayRole: "Student",
    //   role: "student",
    //   roleLevel: 1,
    // });
    // createRole.push({
    //   displayRole: "Administrator",
    //   role: "admin",
    //   roleLevel: 4,
    // });
    
    // createdUser.role = createRole;
    
    // return await createdUser.save();
    console.log(await this.getRole("6510405601"));
    
  }
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
        resData: await this.getRole(decoded.studentId),
        msg: "",
      };
      // this.logger.debug("req->", userDto.test);
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getRole(studentId: string) {
    const tag = this.getRole.name;
    try {
      // const roleDisplayName = await this.roleDB.findAll();
      // const role = await this.userRoleDB.findAll({
      //   where: { fkstudentId: studentId },
      // });
      const userRole = await this.userModel
        .find({ studentId: studentId })
        .select("role");
      // const roleList = [];
      // for (const [index, iterator] of userRole.entries()) {
      //   roleList.push({ role: iterator.displayRole, level: iterator.roleLevel });
      // }

      const roleSortByLevel = _.orderBy(
        userRole[0].role,
        ["roleLevel"],
        ["desc"]
      ).map((x) => x.role);
      return roleSortByLevel;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
