import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LogService } from "../services/log/log.service";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { UserLoginDto } from "./dto/login-user";
import { EnumStatus } from "../services/enum/enum-status";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { UserAuthService } from "../users/user-auth.service";
import { JwtService } from "@nestjs/jwt";
import {
  ResJwtMyKu,
  ResJwtMyKuData,
} from "./interfaces/res-jwt-myku.interface";
import { VerifyGoogleDto } from "./dto/verify-google";

@Injectable()
export class AuthService {
  private logger = new LogService(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    private userAuthService: UserAuthService,
    private jwtService: JwtService
  ) {}

  api_verifyGoogleAuth(req: any) {
    const tag = this.api_verifyGoogleAuth.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: this.verifyGoogleAuth(req),
        msg: "",
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  verifyGoogleAuth(req: any) {
    const tag = this.verifyGoogleAuth.name;
    try {
      const res = { data: req.user };
      return res;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }
  async createJwtPayload(user: CreateJwtPayload) {
    // todo user type
    const data: JwtPayload = {
      id: 1,
      firstNameTh: user.firstNameTh,
      lastNameTh: user.lastNameTh,
      middleNameTh: user.middleNameTh,
      middleNameEn: user.middleNameEn,
      firstNameEn: user.firstNameEn,
      lastNameEn: user.lastNameEn,
      avatar: user.avatar,
      myKuToken: user.accesstoken,
    };

    const jwt = await this.jwtService.signAsync(data, { expiresIn: "30m" });

    return {
      expiresIn: "30m",
      token: jwt,
    };
  }

  async validateUserByJwt(payload: JwtPayload) {
    this.logger.debug("validateUserByJwt");
    const user = await this.userAuthService.findUser(payload.id);
    if (!user) throw new UnauthorizedException();
    if (!user.inClass) {
      return null
    }
    return user;
  }

  async api_userLogin(userLoginDto: UserLoginDto) {
    const tag = this.api_userLogin.name;
    try {
      const resData = {
        resCode: EnumStatus.success,
        resData: await this.userLogin(userLoginDto),
        msg: "",
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async userLogin(userLoginDto: UserLoginDto) {
    const tag = this.userLogin.name;
    try {
      // set api url
      const baseUrl = "https://myapi.ku.th";
      // body
      const bodyRequest = {
        username: userLoginDto.username,
        password: userLoginDto.password,
      };
      // headers ห้ามเปลี่ยน
      const headersRequest = {
        authority: "myapi.ku.th",
        accept: "*/*",
        "accept-language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
        "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
        "content-type": "application/json",
        origin: "https://my.ku.th",
        referer: "https://my.ku.th/",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
      };
      const loginData: ResJwtMyKuData = await firstValueFrom(
        this.httpService.post<ResJwtMyKu>(
          `${baseUrl}/auth/login`,
          bodyRequest,
          {
            headers: headersRequest,
          }
        )
      );
      console.log(loginData.data);
      if (loginData.data) {
        const signTokenData: any = {
          // id: loginData._id,
          // email: user.email,
          firstNameTh: loginData.data.user.firstNameTh,
          lastNameTh: loginData.data.user.lastNameTh,
          middleNameTh: loginData.data.user.middleNameTh,
          middleNameEn: loginData.data.user.middleNameEn,
          firstNameEn: loginData.data.user.firstNameEn,
          lastNameEn: loginData.data.user.lastNameEn,
          avatar: loginData.data.user.avatar,
          myKuToken: loginData.data.accesstoken,
        };
        return this.createJwtPayload(signTokenData);
      }
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
export interface CreateJwtPayload {
  // id: string;
  // email: string;
  firstNameTh: string;
  lastNameTh: string;
  middleNameTh: string;
  middleNameEn: string;
  firstNameEn: string;
  lastNameEn: string;
  avatar: string;
  accesstoken: string;
}
