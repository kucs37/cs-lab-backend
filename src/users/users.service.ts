import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EnumStatus } from "../services/enum/enum-status";
import { LogService } from "../services/log/log.service";
import { firstValueFrom } from "rxjs";
import { UserTokenDto } from "./dto/token-.dto";
@Injectable()
export class UsersService {
  private logger = new LogService(UsersService.name);
  constructor(private readonly httpService: HttpService) {}

  async api_checkClass(userDto: UserTokenDto) {
    const tag = this.api_checkClass.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: { status: "success" },
        msg: "",
      };
      this.logger.debug("req->", userDto.test);
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
