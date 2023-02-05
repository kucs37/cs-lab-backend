import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EnumStatus } from "../services/enum/enum-status";
import { LogService } from "../services/log/log.service";
import { UserAuthService } from "../users/user-auth.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  private logger = new LogService(AuthService.name);
  constructor(
    private userAuthService: UserAuthService,
    private jwtService: JwtService,
  ) {}

  async api_verifyToken(req: any) {
    const tag = this.api_verifyToken.name;
    try {
      const resData = {
        // resCode: EnumStatus.success,
        resData: await this.verifyToken(req),
        msg: "",
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyToken(req: any) {
    const tag = this.verifyToken.name;
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log("token ->", token);

      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.validateUserByJwt(decoded);
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async validateUserByJwt(payload: JwtPayload) {
    this.logger.debug("inClass ->", payload.inClass);
    const user = await this.userAuthService.findUser(payload.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
