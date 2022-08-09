import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EnumStatus } from "../services/enum/enum-status";
import { LogService } from "../services/log/log.service";
import { firstValueFrom } from "rxjs";
import { GoogleAuthenticationService } from "../services/google/googleAuthentication.service";
@Injectable()
export class UsersService {
  private logger = new LogService(UsersService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly googleAuth: GoogleAuthenticationService
  ) {}

  async api_findUser(req: any) {
    const tag = this.api_findUser.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: { status: "success" },
        msg: "",
      };
      this.logger.debug("req->", req);
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
