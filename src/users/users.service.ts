import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnumStatus } from '../services/enum/enum-status';
import { LogService } from '../services/log/log.service';
import { LoginUserDto } from './dto/login-user';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class UsersService {
  private logger = new LogService(UsersService.name);
  constructor(private readonly httpService: HttpService) {}
  async api_loginUser(loginUserDto: LoginUserDto) {
    const tag = this.api_loginUser.name;
    try {
      const baseUrl = 'https://myapi.ku.th';
      const bodyRequest = {
        username: loginUserDto.username,
        password: loginUserDto.password,
      };
      const headersRequest = {
        authority: 'myapi.ku.th',
        accept: '*/*',
        'accept-language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
        'app-key': 'txCR5732xYYWDGdd49M3R19o1OVwdRFc',
        'content-type': 'application/json',
        origin: 'https://my.ku.th',
        referer: 'https://my.ku.th/',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
      };
      const loginData = await firstValueFrom(
        this.httpService.post(`${baseUrl}/auth/login`, bodyRequest, {
          headers: headersRequest,
        }),
      );
      console.log(loginData.data);

      const resData = {
        resCode: EnumStatus.success,
        resData: loginData.data,
        msg: '',
      };
      return resData;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
